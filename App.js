import React, { useState, useCallback, useEffect } from "react";
import "./App.css";

import Playlist from "./Playlist";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import Spotify from "./Spotify";




function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const song = document.querySelector('.Track');
    // Now 'song' contains the first element with the class '.Track'
  }, []);
  


  useEffect(() => {
    // Use useEffect to check authentication status on component mount
    const accessToken = Spotify.getAccessToken();
    setAuthenticated(accessToken !== undefined);
  }, []);

  const search = useCallback((term) => {
    Spotify.search(term).then(setSearchResults);
  }, []);

  const addTrack = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
  
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => prevTracks.filter((currentTrack) => currentTrack.id !== track.id));
  }, [playlistTracks]);

  const updatePlaylistName = useCallback((name) => {
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    const trackUris = playlistTracks.map((track) => track.uris);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  return authenticated ? (    
    <div className="app">
      <div className="Search">
        <SearchBar onSearch={search} />
      </div>

      <div className="contain">
        <h2></h2>
        <div className="Results">
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
        </div>

        <div className="playlist">
        <Playlist 
          playlistName={playlistName} 
          playlistTracks={playlistTracks}
          onNameChange={updatePlaylistName}
          onRemove={removeTrack}
          onSave={savePlaylist}
        />
        </div>
      </div>
    </div>

  ) : (
  // Render something else or nothing if not authenticated
  <div>
      <div className="authorization">
        <button onClick={Spotify.getAccessToken}>Authorization</button>
      </div>
  </div>
);
}

export default App;
