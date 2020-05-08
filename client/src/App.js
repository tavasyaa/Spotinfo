import React from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js';

const SpotifyWebApi = new Spotify();

class App extends React.Component {

  constructor() {
    // this gives us an object that has access and refresh tokens:
    super();
    const params = this.getHashParams();
      this.state = {
        loggedIn: params.access_token ? true : false,
        nowPlaying: {
         name: 'Not checked',
         image: ''
        }
    }
    if (params.access_token){
      SpotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  getNowPlaying() {
    SpotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({
          nowPlaying: {
            name: response.item.name,
            image: response.item.album.images[0].url
          }
        })
      })
  }

  render() {
    return (
      <div className="App">
        <a href="http://localhost:8888">
          <button> Log in with Spotify </button>
        </a>
        <div> Now Playing: {this.state.nowPlaying.name} </div>
        <div>
          <img src={this.state.nowPlaying.image} style= {{width: 100}}/>
        </div>
        <button onClick={() => this.getNowPlaying()}>
          Check what's playing!
        </button>
      </div>
    );
  }
}

export default App;
