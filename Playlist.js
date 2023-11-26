import React, {useCallback, useState} from 'react';
import Tracklist from './Tracklist';

function Playlist(props){
    const [header, setHeader] = useState("");
    
    const handleNameChange = useCallback((event) => {
        props.onNameChange(event.target.value);
        setHeader(event.target.value);
    }, [props.onNameChange]
    );

    return (
        <div className='MyPlaylist'>
            <input onChange={handleNameChange} defaultValue={"New Playlist"} />
            <div className='scale-down'>
            <Tracklist 
                className="MyPlaylist"
                tracks={props.playlistTracks}
                isRemoval={true}
                onRemove={props.onRemove}
            />
            </div>
            <h3>{header}</h3>
            <button className='Save' onClick={props.onSave}>
                Save to spotify
            </button>
        </div>
    );
};

export default Playlist;