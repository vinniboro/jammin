const clientId = 'da7447779cfd4489b561a1f4ad314c4f'; // Replace with your Spotify client ID
const redirectUri = 'http://localhost:3000/callback/';
let accessToken;
let userId;

const headers = {
  Authorization: '',
};

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ''), expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      headers.Authorization = `Bearer ${accessToken}`;
      return accessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(term) {
    try {
      const accessToken = Spotify.getAccessToken();
      const searchHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: searchHeaders,
      });

      if (!response.ok) {
        throw Error('Network response was not ok');
      }

      const jsonResponse = await response.json();

      if (!jsonResponse.tracks) {
        return [];
      }

      return jsonResponse.tracks.items.map((track) => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        image: track.album.images[0].url,
      }));
    } catch (error) {
      // Handle the error, e.g., display an error message to the user
      console.error('Error searching for tracks:', error);
      return [];
    }

    
  },

  async savePlaylist(name, trackUris) {
    try {
      if (!name || !trackUris.length) {
        return Promise.resolve(); // No need to proceed if there's no data.
      }

      const accessToken = Spotify.getAccessToken();
      headers.Authorization = `Bearer ${accessToken}`;

      const userResponse = await fetch('https://api.spotify.com/v1/me', { headers });

      if (!userResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const userJsonResponse = await userResponse.json();
      userId = userJsonResponse.id;

      const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ name: name }),
      });

      if (!playlistResponse.ok) {
        throw new Error('Network response was not ok');
      }

      const playlistJsonResponse = await playlistResponse.json();
      const playlistId = playlistJsonResponse.id;

      await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
        headers,
        method: 'POST',
        body: JSON.stringify({ uris: trackUris }),
      });
    } catch (error) {
      // Handle the error, e.g., display an error message to the user
      console.error('Error saving the playlist:', error);
    }
  },

  async getCurrentlyPlayingTrack() {
    try {
      const accessToken = Spotify.getAccessToken();
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
        headers,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const currentlyPlayingData = await response.json();

      if (!currentlyPlayingData.item) {
        // No track is currently playing
        return null;
      }

      const track = currentlyPlayingData.item;

      return {
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri,
        image: track.album.images[0].url,
      };
    } catch (error) {
      // Handle the error, e.g., display an error message to the user
      console.error('Error getting currently playing track:', error);
      return null;
    }
    
  }, 
};

const AuthorizationButton = () => {
  return (
    <div>
      <button onClick={Spotify.getAccessToken}>Authorization</button>
    </div>
  );
};





export default Spotify;
