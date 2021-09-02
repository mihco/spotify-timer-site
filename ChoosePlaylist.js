import Playlist from "./Playlist"

function ChoosePlaylist(props) {
    const playlists = props.playlists.map(item => <Playlist item={item} token={props.token} spotify={props.spotify} />)
    return (
        <div>
            <h1>Enter a time</h1> {/* make this into one component */}
            <input type="time"></input>
            <h1>Choose a Playlist</h1>
            { playlists }
            <button >Refresh Token</button>
            <button >Log Out</button>
        </div>
    )
}

export default ChoosePlaylist