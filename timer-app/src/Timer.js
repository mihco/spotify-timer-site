import React, { useState, useEffect } from "react"
import Playlist from "./Playlist"
import Playlists from "./PlaylistsSample"
import SpotifyWebApi from 'spotify-web-api-js';
import { getHash } from './getHash.js'
const spotifyApi = new SpotifyWebApi();

function sum(list) {
    let sum = 0
    for(let i = 0; i < list.length; i++) {
        sum += list[i].track.duration_ms
    }
    return sum
}

function msToHMS(timeMS) {
    var hours = Math.floor((timeMS % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeMS % (1000 * 60 * 60)) / (1000 * 60));  
    var seconds = Math.floor((timeMS % (1000 * 60)) / 1000);
    return [hours, minutes, seconds]
}

function getCombinations(array) { // i think theres a problem with this function, we'll have to check it out

    var result = [];
    function fork(i, t) {
        if (i === array.length) {
            result.push(t);
            return;
        }
        fork(i + 1, t.concat([array[i]]));
        fork(i + 1, t);
    }

    fork(0, []);
    return result;
}

/*
function songChooser(playlistItems, timeObj, range=0) {
    let time = (timeObj.hours * 3600000) + (timeObj.minutes * 60000) + (timeObj.seconds * 1000)
    // let subsets = getAllSubsets(playlistItems)
    let validPlaylists = []
    for(let i = 0; i < subsets.length; i++) {
        let subSum = sum(subsets[i])
        if(subSum >= (time - range) && subSum <= time) { // i think this range is wrong, fix this later
            validPlaylists.push(subsets[i])
        }
    }
    return {orderedSongs: validPlaylists, totalTime_ms: time} 

}
*/

class Timer extends React.Component {
    constructor() {
        super();
        this.state = {
            playlist: "",
            tracks: "",
            paused: true,
            time: 0,
            countdown: [0, 0, 0]
        }
        this.pressPlay = this.pressPlay.bind(this)
    }

    componentDidMount() {
        console.log(this.props)
        spotifyApi.setAccessToken(this.props.token);
        spotifyApi.getPlaylist(this.props.playlistId)
            .then(data => {console.log(data); return new Promise((resolve, reject) => { this.setState({playlist: data}); resolve(this.state.playlist)})})
            .then(data => {
                this.setState({tracks: data.tracks.items, time: sum(data.tracks.items)}); 
                console.log(data.tracks.items)
            })
    }

    componentDidUpdate(prevProps, prevState) {

    }

    pressPlay(e) {
        if(this.state.paused && this.state.tracks && this.props.token) {
            let s = spotifyApi.pause()
                .then(spotifyApi.queue(this.state.tracks[0].track.uri))
                .then(spotifyApi.skipToNext())
                .then(spotifyApi.play())
                .then(console.log("async complete")).catch(data => console.log(data))
                for(let i = 1; i < this.state.tracks.length; i++) {
                    s = s.then(spotifyApi.queue(this.state.tracks[i].track.uri), (reason) => console.log(reason))
                    console.log("completed successfully")
                }
            var countdownTime = new Date().getTime() + this.state.time
            var count = setInterval(() => {
                var now = new Date().getTime()
                var distance = msToHMS(countdownTime - now)
                this.setState({countdown: distance})

                if(distance < 0) {
                    clearInterval(count)
                    this.setState({countdown: 0})
                }
            }, 1000)
        }
    }

    render() {
        return ( 
            <div className="align-item-center">
                <p>Time: {this.props.timeSelected.hours} {this.props.timeSelected.minutes} {this.props.timeSelected.seconds}</p>
                <p>Playlist Time: {this.state.time}</p>
                <p>Countdown: Hours: {this.state.countdown[0]} Minutes: {this.state.countdown[1]} Seconds: {this.state.countdown[2]}</p>
                <button onClick={this.pressPlay}>Play/Pause</button>
                <button>Reset</button>
                <h5>Playing:</h5>
                <Playlist id={this.props.playlistId} key={this.props.playlistId} withButton={false}/>
                
                <button>Export this Mix</button>
            </div>
        )
    }
}

/*
import React, { useState, useEffect } from "react"
import Playlist from "./Playlist"
import Playlists from "./PlaylistsSample"
import SpotifyWebApi from 'spotify-web-api-js';
import { getHash } from './getHash.js'
const spotifyApi = new SpotifyWebApi();

function Timer (props) {
    const [ playlist, setPlaylist] = useState("")
    const [ songList, setSongList] = useState("")
    const [ token, setToken ] = useState(getHash().access_token)
    const [ paused, setPaused ] = useState(true)

    useEffect(
        () => {
            spotifyApi.setAccessToken(token)
            if(playlist === "") {
                spotifyApi.getPlaylist(props.playlistId)
                .then(data => {return new Promise((resolve, reject) => { setPlaylist(data); resolve(playlist)})})
            } else {
                setSongList(playlist.tracks.items)
            }
            console.log(playlist)
        }, [playlist]
    )

    function pressPlay(e) {
        if(paused && songList) {
            let s = spotifyApi.pause()
                .then(spotifyApi.queue(songList[0].uri))
                .then(spotifyApi.skipToNext())
                .then(spotifyApi.play())
                .then(console.log("async complete"))
            console.log("click worked")
            */
            /*
            for(let i = 1; i < songList.length; i++) {
                s = s.then(spotifyApi.queue(songList[i].uri))
                console.log("completed successfully")
            }
            */
           /*
        } else {
            console.log("conditions not met")
        }
    }

    return ( 
        <div>
            <p>time goes here</p>
            <button >Play/Pause</button>
            <button onClick={pressPlay()}>Reset</button>
            <h5>Playing:</h5>
            <Playlist id={props.playlistId} key={props.playlistId} withButton={false}/>
            
            <button>Export this Mix</button>
        </div>
    )
}

*/

/*https://www.w3schools.com/howto/howto_js_countdown.asp*/
export default Timer
