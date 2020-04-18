import React, { Component }  from 'react';
import axios from 'axios';
import './App.css';
import ItemsList from './components/ItemsList'
import Card from './components/Card'
import PlaylistVideos from './components/PlaylistVideos'

class App extends Component {
  state = {
    playlists: [],
    selectedPlayListItems: [],
    playlistSelected: false,
    apiKey: process.env.REACT_APP_YOUTUBE_API_KEY,
    userId: process.env.REACT_APP_USER_ID,
    channelId: process.env.REACT_APP_CHANNEL_ID,
  };

  componentDidMount() {
    this.getUserPlaylists()
  }

  getUserPlaylists() {
    axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${this.state.channelId}&maxResults=25&key=${this.state.apiKey}`)
    .then(response => this.setState({ playlists: response.data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    })) }))
  }

  getSelectedPlaylistItems(selectedPlayListId) {
    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=50&playlistId=${selectedPlayListId}&key=${this.state.apiKey}`)
    .then(res => res.data.items)
    .then(items => {
      const promises = items.map(async item => {
        return {
         id: item.contentDetails.videoId,
         title: item.snippet.title,
         thumbnail: item.snippet.thumbnails.default.url,
         duration: await this.getVideoDuration(item.contentDetails.videoId)
        }
      });
      
      // Waits for all promises above to resolve before returning data
      Promise.all(promises)
      .then(actualData => {
        // Set the state
        this.setState({ selectedPlayListItems: actualData})
      })
    });
  }
  
  getVideoDuration(videoId) {
    const posts = axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${this.state.apiKey}`)
    .then(data => data.data.items[0].contentDetails.duration);
    return posts;
  }

  render() {
    return (
        <div className="App">
          <div className="container">
            {this.state.playlists &&
            <ItemsList
              key="1"
              type="playlistList"
              items={this.state.playlists}
              onClick={this.getSelectedPlaylistItems.bind(this)}
              buttonAction="View videos">
            </ItemsList>
            }
            {this.state.selectedPlayListItems.length > 0 &&            
            <ItemsList
              key="2"
              type="playlistVideosList"
              items={this.state.selectedPlayListItems}
              buttonAction="View video">
            </ItemsList>
            }
          </div>
        </div>
    );
  }
}

export default App;
