import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import Playlists from "./PlaylistsSample"
import Playlist from "./Playlist"
import Timer from "./Timer";
import Login from "./Login"
import { json } from 'express';

var req = new XMLDocument()
var playlists;

class App extends React.Component {
  constructor() {
    super()
    this.state = { 
      loggedIn: false, // definitely don't need two booleans
      isChosen: false // find a way to replace the components being rendered
    }
    this.handleClick = this.handleClick.bind(this);
    this.choosePlaylist = this.choosePlaylist.bind(this);
  }

  handleClick() {
    if(this.state.loggedIn != true) {
      req.open('GET', "http://localhost:8888/playlists", true)
      req.send()
    }
    req.onreadystatechange = function() {
      playlists = JSON.parse(req.responseText)["items"]
    }
    this.setState(prevState => ({
      loggedIn: !prevState.loggedIn
    }))
  }

  choosePlaylist() {
    this.setState(prevState => ({
      isChosen: !prevState.isChosen
    }))
  }

  displayPlaylists() {
    if(playlists) {
      return (
        playlists.map(item => (
          <div>
            <Playlist item={item} /> 
            <button onClick={this.choosePlaylist}>pick me</button>
          </div>))
      )
    }
    return <div></div>
  }

  render() {
    if(this.state.isChosen) {
      return (
        <Timer/>
      )
    }
    if(this.state.loggedIn) {
      return (
        <div>
        <h1>Enter a time</h1> {/* make this into one component */}
        <input type="time"></input>
        <h1>Choose a Playlist</h1>
        {this.displayPlaylists}
        <button onClick={this.handleClick}>Log Out</button>
      </div>
      );
    }
    return (
      <Login func={this.handleClick}/>
    )
  }
}

export default App;
