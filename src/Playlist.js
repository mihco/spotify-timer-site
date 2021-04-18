function Playlist(props) {
    return (
        <div>
            <img src={props.item.image}></img>
            <h2 id="name">{props.item.name}</h2>
            <p id="user">{props.item.user}</p>
            <p id="numberofsongs">{props.item.numoftracks}</p>
            <p id="playtime">{props.item.length}</p>
        </div>
    )
}

export default Playlist