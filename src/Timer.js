import React from "react"
import Playlist from "./Playlist"
import Playlists from "./PlaylistsSample"

class Timer extends React.Component {
    constructor() {
        super()
        this.state = {
            // this is where ur time would probably go
        }
    }

    render() {
        return ( 
            <div>
                <p>time goes here</p> {/*https://www.w3schools.com/howto/howto_js_countdown.asp*/}
                <button>Play/Pause</button>
                <button>Reset</button>
                <h5>Playing:</h5>
                <Playlist item={Playlists[0]}/>
                <button>Export this Mix</button>
            </div>
        )
    }
}

export default Timer