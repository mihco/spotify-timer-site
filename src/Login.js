import Spotify from "./Spotify"

function Login(props) {
    return (
        <div>
          <h1>Timer</h1>
          <Spotify/>
          <button onClick={props.func}>Log In</button>
          <footer>Created by mihco</footer>
        </div>
      )
}

export default Login