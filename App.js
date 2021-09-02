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
      playlistId: ""
    }
    this.playlistChoose = this.playlistChoose.bind(this)
  }

  componentDidMount() {
    if(this.token) {
      console.log("doing the promise thing")
      spotifyApi.getUserPlaylists().then(data => (
        this.setState({playlists: data["items"]})
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

  render() {
    if(this.state.playlistChosen) {
      console.log("this if works")
      return(
        <div>
          <Timer playlistId={this.state.playlistId}/>
        </div>
      )
    } else if(this.state.loggedIn) {
      return (
        <div>
          <form onSubmit={this.playlistChoose} id="playlistChoose">
            <h1>Enter a time</h1> {/* make this into one component */}
            <input type="time"></input>
            <h1>Choose a Playlist</h1>
            { this.state.playlists ? this.state.playlists.map(item => <Playlist id={item.id} key={item.id} withButton={true}/>) : <img src={loading} /> }
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
