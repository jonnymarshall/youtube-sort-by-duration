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
    apiKey: process.env.API_KEY,
    userId: process.env.USER_ID,
    channelId: process.env.CHANNEL_ID,
  };

  componentDidMount() {
    this.getUserPlaylists()
  }

  getUserPlaylists() {
    axios.get(`https://www.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCdL_mXnwxBxVSHBnkoXaIbQ&maxResults=25&key=${this.state.apiKey}`)
    .then(response => this.setState({ playlists: response.data.items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url
    })) }))
  }

  getSelectedPlaylistItems(selectedPlayListId) {
    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=50&playlistId=${selectedPlayListId}&key=${this.state.apiKey}`)
    .then(response => this.setState({ selectedPlayListItems: response.data.items.map(async(item) => ({
      id: item.contentDetails.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.default.url,
      duration: await this.getVideoDuration(item.contentDetails.videoId)
    }))}))
  }

  async getVideoDuration(videoId) {
    let value = null
    axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${this.state.apiKey}`)
    .then(async(response) => { value = await response.data.items[0].contentDetails.duration } )
    return value
  }

  render() {
    console.log(this.state.selectedPlayListItems[0])

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
