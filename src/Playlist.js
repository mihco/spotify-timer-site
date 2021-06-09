function Playlist(props) {
    return (
        <div>
            {<img src={props.item.images[0]}></img>}
            <h2 id="name">{props.item.name}</h2>
            <p id="user">{props.item.owner.id}</p>
            <p id="numberofsongs">{props.item.tracks.total}</p>
            <p id="playtime">playtime placeholder</p>
        </div>
    )
}

export default Playlist