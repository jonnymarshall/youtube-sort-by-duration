import React, { Component }  from 'react';
import axios from 'axios';
import './App.css';
import ItemsList from './components/ItemsList'
import VideoEmbed from './components/VideoEmbed'
import PlaylistVideos from './components/PlaylistVideos'
import 'bootstrap/dist/css/bootstrap.min.css'
import styled from 'styled-components'
import Filter from './components/Filter'
import Breadcrumb from './components/Breadcrumb'
import Jumbotron from './components/Jumbotron'
import ActiveVideo from './components/ActiveVideo'



class App extends Component {
  state = {
    apiKey: process.env.REACT_APP_YOUTUBE_API_KEY,
    userId: process.env.REACT_APP_USER_ID,
    channelId: process.env.REACT_APP_CHANNEL_ID,
    ///
    playlists: null,
    filteredPlayLists: null,
    selectedPlaylist: null,
    ///
    playlistVideos: null,
    filteredVideos: null,
    selectedVideo: null,
    ///
    playlistSearch: "",
    videoSearch: ""
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

  getplaylistVideos(selectedPlayListId) {
    
    let playlists = [...this.state.playlists]
    playlists.map((playlist) => {
      playlist.active = false
      if (playlist.id === selectedPlayListId) {
        playlist.active = !playlist.active
        this.setState({selectedPlaylist: playlist})
      }
    })
    this.setState({playlists})
    
    console.log("entered getplaylistVideos")

    axios.get(`https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2Csnippet&maxResults=50&playlistId=${selectedPlayListId}&key=${this.state.apiKey}`)
    .then(res => res.data.items)
    // .then(items => console.log(items))
    .then(items => {
      const promises = items.map(async item => {
        return {
         id: item.contentDetails.videoId,
         title: item.snippet.title,
         description: item.snippet.description,
         thumbnail: item.snippet.thumbnails.medium.url,
         duration: await this.getVideoDuration(item.contentDetails.videoId),
         active: false
        }
      });
      
      // Waits for all promises above to resolve before returning data
      Promise.all(promises)
      .then(finalData => {
        // Set the state
        this.setState({ playlistVideos: finalData})
      })
    });
  }
  
  getVideoDuration(videoId) {
    const posts = axios.get(`https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=${videoId}&key=${this.state.apiKey}`)
    .then(data => data.data.items[0].contentDetails.duration);
    return posts;
  }

  async filterPlaylists(event) {
    await this.setState({playlistSearch: event.target.value});
    this.setState({filteredPlayLists: this.state.playlists.filter(item => item.title.toLowerCase().includes(`${this.state.playlistSearch}`))});
  }

  async filterVideos(event) {
    await this.setState({videoSearch: event.target.value});
    this.setState({filteredVideos: this.state.playlistVideos.filter(item => item.title.toLowerCase().includes(`${this.state.videoSearch}`))});
  }

  resetSelections() {
    this.setState({
      selectedPlaylist: null,
      filteredPlayLists: null,
      playlistVideos: null
    })
    
  }

  render() {
    const filterPlaylists = this.filterPlaylists.bind(this);
    const filterVideos = this.filterVideos.bind(this);
    const getplaylistVideos = this.getplaylistVideos.bind(this)
    const resetSelections = this.resetSelections.bind(this)
    const videos = this.state.filteredVideos ? this.state.filteredVideos : this.state.playlistVideos
    const playlists = this.state.filteredPlayLists ? this.state.filteredPlayLists : this.state.playlists
    console.log(this.state)
    return (
      <div className="App">
        <div className="container">
          <Jumbotron />

          <Breadcrumb
            selectedPlaylist={this.state.selectedPlaylist}
            onClick={resetSelections}
          />

          {!this.state.selectedPlaylist &&
            <>
              <Filter
                onChange={filterPlaylists}
                value={this.state.playlistSearch}
                placeholder="Search playlists"
              />
              <div className="row row-cols-4">
                {playlists &&
                  <ItemsList
                    key="1"
                    items={playlists}
                    onClick={getplaylistVideos}>
                  </ItemsList>
                }
              </div>
            </>
          }

          {this.state.playlistVideos &&
          <>
            <Filter
              onChange={filterVideos}
              value={this.state.videoSearch}
              placeholder="Search videos"
            />
            <div className="row">
              <div className="col-10 offset-1 border bg-light">
                <ActiveVideo
                    key="x"
                    size="large"
                    item={this.state.playlistVideos[0]}>
                </ActiveVideo>
              </div>
            </div>
          </>
          }

          <ul className="list-unstyled">
            {videos && videos.map((item) =>   
              <VideoEmbed
                key="2"
                size="small"
                item={item}>
              </VideoEmbed> 
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
