import React, { Component } from 'react';
import Spotify from './Spotify'; // Import your Spotify module
class CurrentlyPlaying extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentlyPlaying: null,
      };
    }
  
    componentDidMount() {
      this.fetchCurrentlyPlayingTrack();
    }
  
    fetchCurrentlyPlayingTrack() {
      Spotify.getCurrentlyPlayingTrack()
        .then((track) => {
          this.setState({ currentlyPlaying: track });
        })
        .catch((error) => {
          console.error('Error fetching currently playing track:', error);
        });
    }
  
    render() {
      const { currentlyPlaying } = this.state;
  
      return (
        <div className="CurrentlyPlaying">
          <h2>Currently Playing</h2>
          {currentlyPlaying ? (
            <div>
              <img src={currentlyPlaying.image} alt="Album Cover" />
              <h3>{currentlyPlaying.name}</h3>
              <p>{currentlyPlaying.artist} | {currentlyPlaying.album}</p>
            </div>
          ) : (
            <p>No track currently playing</p>
          )}
        </div>
      );
    }
  }
  
  export default CurrentlyPlaying;
  