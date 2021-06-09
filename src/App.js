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
      playlists: []
    }
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

  render() {
    if(this.state.loggedIn) {
      return (
        <div>
          {console.log(this.state.playlists)}
          {this.state.playlists && <ChoosePlaylist playlists={this.state.playlists}/>}
        </div>
      )
    } else {
      console.log("login pushed out")
      return <Login/>
    }
  }
}

export default App;
