import logo from './logo.svg';
import './App.css';
import React from 'react';
import Playlists from "./PlaylistsSample"
import Playlist from "./Playlist"
import Timer from "./Timer";
import Login from "./Login"
import ChoosePlaylist from "./ChoosePlaylist"
import SpotifyWebApi from 'spotify-web-api-js';
const spotifyApi = new SpotifyWebApi();
const loading = "https://res.cloudinary.com/practicaldev/image/fetch/s--huFQ3nbp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/gqmymopg8bignlcfhvcx.gif"

class App extends React.Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.token = params.access_token;
    if (this.token) {
      spotifyApi.setAccessToken(this.token);
    }
    this.state = {
      loggedIn: this.token ? true : false,
      playlists: [],
      playlistChosen: false,
      playlistId: "",
      timeSelected: {hours: 0, minutes: 0, seconds: 0}
    }
    this.playlistChoose = this.playlistChoose.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    if(this.token) {
      console.log("doing the promise thing")
      spotifyApi.getUserPlaylists().then(data => (
        this.setState({playlists: data["items"]}),
        console.log(data["items"])
        ), err => (console.log(err)))
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    console.log(hashParams)
    return hashParams;
  }

  playlistChoose(event) {
    console.log(event.nativeEvent.submitter.id)
    this.setState({playlistChosen: true, playlistId: event.nativeEvent.submitter.id}, () => {
      console.log(this.state.playlistId)
      console.log(this.state.playlistChosen)
    })
  }

  handleChange(event) {
    
    this.setState(prevState => {
      let stateUpdate = {timeSelected: {hours: prevState.timeSelected.hours, minutes: prevState.timeSelected.minutes, seconds: prevState.timeSelected.seconds}}
      stateUpdate.timeSelected[event.target.id] = event.target.value
      return stateUpdate
    })
  }

  render() {
    if(this.state.playlistChosen) {
      console.log("this if works")
      return(
        <div id="gaming" className="text-center">
          <Timer playlistId={this.state.playlistId} token={this.token} timeSelected={this.state.timeSelected}/>
        </div>
      )
    } else if(this.state.loggedIn) {
      return (
        <div id="gaming" className="text-center">
          <form onSubmit={this.playlistChoose} id="playlistChoose">
            <h1>Enter a time</h1> {/* make this into one component */}
            {/* change api calls so that you can display the different playlists that are available with the time that is inputted */}
            <div style={{ borderWidth: "5px", borderColor: "black", border: "solid", width: "370px", boxSizing: "border-box", margin: "auto", borderRadius: "20px", justifyContent: "space-around", display: "flex"}}>
              <div style={{margin: "5px", display: "inline-block", width: "33%"}}>
                <h5>Hours:</h5>
                <input type="number" id="hours" min="0" max="2" style={{width: "50px"}} onInput={this.handleChange} value={this.state.timeSelected.hours}></input>
              </div>
              <div style={{margin: "5px", display: "inline-block", width: "33%"}}>
                <h5>Minutes:</h5>
                <input type="number" id="minutes" min="0" max="59" style={{width: "50px"}} onInput={this.handleChange} value={this.state.timeSelected.minutes}></input>
              </div>
              <div style={{margin: "5px", display: "inline-block", width: "33%"}}>
                <h5>Seconds:</h5>
                <input type="number" id="seconds" min="0" max="59" style={{width: "50px"}} onInput={this.handleChange} value={this.state.timeSelected.seconds}></input>
              </div>
            </div>
            <h1>Choose a Playlist</h1>
            <div style={{maxHeight: "225px", display: "inline-block", overflow: "auto", border: "solid"}} className="align-item-center">
            { this.state.playlists ? this.state.playlists.map(item => <Playlist id={item.id} key={item.id} withButton={true}/>) : <img src={loading} /> }
            </div>
          </form>
          <button className="btn btn-dark">Refresh Token</button>
          <button className="btn btn-secondary">Log Out</button>
        </div>
      )
    } else {
      console.log("login pushed out")
      return <Login/>
    }
  }
}

export default App;
