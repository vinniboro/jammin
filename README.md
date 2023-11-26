React Spotify Playlist Manager

Overview
This React application serves as a simple Spotify playlist manager, allowing users to search for tracks, add them to a playlist, and save the playlist to their Spotify account. The project utilizes the Spotify Web API for authentication and fetching track information.

Features
Search Bar: Enables users to search for tracks on Spotify.
Search Results: Displays search results with the ability to add tracks to the playlist.
Playlist: Manages the user's playlist, allowing them to remove tracks, update the playlist name, and save the playlist to their Spotify account.
Project Structure
App.js: The main component that orchestrates the overall structure and logic of the application.
SearchBar.js: Component responsible for handling user input and triggering Spotify searches.
SearchResults.js: Displays the search results and provides an interface to add tracks to the playlist.
Playlist.js: Manages the playlist, allowing users to update the name, remove tracks, and save the playlist.

Installation
Clone the repository.
Install dependencies using npm install.
Obtain Spotify API credentials and set them in the Spotify.js file.
Run the application with npm start.

Usage
Open the application in your browser.
Authenticate with your Spotify account by clicking the "Authorization" button.
Use the search bar to find tracks and add them to the playlist.
Manage the playlist by updating the name, removing tracks, and saving to Spotify.

Dependencies
React
Spotify Web API
CSS (styling)