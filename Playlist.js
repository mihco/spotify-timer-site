import React, { useEffect, useState } from "react"
import SpotifyWebApi from 'spotify-web-api-js';
import { getHash } from './getHash.js'
const spotifyApi = new SpotifyWebApi();

function Playlist(props) {
    const [ image, setImage ] = useState("")
    const [ playlist, setPlaylist ] = useState("")
    const [ token, setToken ] = useState(getHash().access_token)

    useEffect(
        () => {
            spotifyApi.setAccessToken(token)
            spotifyApi.getPlaylistCoverImage(props.id).then(data => setImage(data[0]), console.log)
            spotifyApi.getPlaylist(props.id).then(data => setPlaylist(data), console.log)
        }, []
    )
    
    const loading = "https://res.cloudinary.com/practicaldev/image/fetch/s--huFQ3nbp--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_66%2Cw_880/https://dev-to-uploads.s3.amazonaws.com/i/gqmymopg8bignlcfhvcx.gif"
    if(playlist) {
        return (
            <div className="card mb-3" style={{maxWidth: "700px"}}>
                <div className="row g-0">
                    <div className="col-md-4">
                        {<img src={image ? image["url"] : loading} style={{width: "200px", height: "200px", objectFit: "cover", display: "block"}}></img>}
                    </div>
                    <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title" id="name">{playlist.name}</h5>
                        <p className="card-text" id="user">owner</p>
                        <p className="card-text" id="numberofsongs"><small className="text-muted">{playlist.tracks.total}</small></p>
                        <p className="card-text" id="playtime"><small className="text-muted">playtime placeholder</small></p>
                        {props.withButton && <input type="submit" className="btn btn-dark" value="Pick Me" id={playlist.id} form="playlistChoose"></input>}
                        {/* ADD A TAG TO DISPLAY ESTIMATED RUNTIME */}
                    </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <img src={loading} style={{width: "200px", height: "200px", objectFit: "cover"}}></img>
        )
    }
}

export default Playlist