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
            spotifyApi.getPlaylist(props.playlistId)
                .then(data => setPlaylist(data))
                .then(setSongList(playlist.tracks))
        }, []
    )

    function pressPlay(e) {
        if(paused && songList) {
            let s = spotifyApi.pause()
                .then(spotifyApi.queue())
                .then(spotifyApi.skipToNext())
                .then(spotifyApi.play())
            for(let i = 1; i < songList.length; i++) {
                s = s.then(spotifyApi.queue())
            }
        }
        
    }

    return ( 
        <div>
            <p>time goes here</p> {/*https://www.w3schools.com/howto/howto_js_countdown.asp*/}
            <button >Play/Pause</button>
            <button>Reset</button>
            <h5>Playing:</h5>
            <Playlist id={props.playlistId} key={props.playlistId} withButton={false}/>
            
            <button>Export this Mix</button>
        </div>
    )
}
/* <Playlist item={playlist}/> */

export default Timer