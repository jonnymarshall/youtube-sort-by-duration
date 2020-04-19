import React, { Component }  from 'react';
import axios from 'axios';
import './App.css';
import ItemsList from './components/ItemsList'
import VideoEmbed from './components/VideoEmbed'
import PlaylistVideos from './components/PlaylistVideos'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'



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
      thumbnail: item.snippet.thumbnails.medium.url,
      active: false
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
         thumbnail: item.snippet.thumbnails.medium.url,
         duration: await this.getVideoDuration(item.contentDetails.videoId),
         active: false
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
          <div className="jumbotron">
            <h1 className="display-4">Welcome to YouTubeByDuration!</h1>
            <p className="lead">Finally, a way to sort your YouTube playlists by duration for that perfectly timed binge!</p>
            <hr className="my-4"></hr>
            <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
            <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
          </div>
          <div className="row row-cols-4">
            {this.state.playlists &&
            <ItemsList
              key="1"
              items={this.state.playlists}
              onClick={this.getSelectedPlaylistItems.bind(this)}>
            </ItemsList>
            }
          </div>
          <div className="row row-cols-4">
            {this.state.selectedPlayListItems.length > 0 && this.state.selectedPlayListItems.map((item) =>          
              <VideoEmbed
                key="2"
                item={item}>
              </VideoEmbed>
            )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
