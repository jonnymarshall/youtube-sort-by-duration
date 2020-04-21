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
import OrderingButtons from './components/OrderingButtons'


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
    videoSearch: "",
    ///
    orderBy: "shortest"
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

  selectVideo(selectedVideoId) {
    this.state.playlistVideos.map((video) => {
      video.active = false
      if (video.id === selectedVideoId) {
        video.active = !video.active
        this.setState({selectedVideo: video})
      }
    })
  }

  // Clear video and playlist filters
  resetAllSelections() {
    this.setState({
      selectedPlaylist: null,
      filteredPlayLists: null,
      playlistVideos: null,
    })
    this.resetVideoSelections()
  }

  // Clear video filters
  resetVideoSelections() {
    this.setState({
      playlistSearch: null,
      videoSearch: null,
      filteredVideos: null,
      selectedVideo: null
    })
  }

  // Builds filter
  getFilterVariables = () => {
    if (!this.state.selectedPlaylist) return {
      onChangeFunc: this.filterPlaylists.bind(this),
      placeholderText: "Search playlists",
      inputValue: this.playlistSearch
    }
    else return {
      onChangeFunc: this.filterVideos.bind(this),
      placeholderText: "Search videos",
      inputValue: this.videoSearch
    }
  }

  // orderBy
  toggleOrderBy = (orderType) => {
    this.setState({orderBy: orderType})
  }

  render() {
    const getplaylistVideos = this.getplaylistVideos.bind(this)
    const resetAllSelections = this.resetAllSelections.bind(this)
    const resetVideoSelections = this.resetVideoSelections.bind(this)
    const selectVideo = this.selectVideo.bind(this)
    const toggleOrderBy = this.toggleOrderBy.bind(this)
    const videos = this.state.filteredVideos ? this.state.filteredVideos : this.state.playlistVideos
    const playlists = this.state.filteredPlayLists ? this.state.filteredPlayLists : this.state.playlists
    return (
      <div className="App">
        <div className="container">
          <Jumbotron />
          <Breadcrumb
            selectedPlaylist={this.state.selectedPlaylist}
            selectedVideo={this.state.selectedVideo}
            resetVideoSelections={resetVideoSelections}
            resetAllSelections={resetAllSelections}
          />
          <Filter
            onChange={this.getFilterVariables().onChangeFunc}
            placeholder={this.getFilterVariables().placeholderText}
            value={this.getFilterVariables().inputValue}
          />
          {this.state.selectedPlaylist &&
            <OrderingButtons
            orderBy={this.state.orderBy}
            toggleOrderBy={toggleOrderBy}
            />
          }
          
          {!this.state.selectedPlaylist &&
            <> 
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

          {this.state.selectedVideo &&
          <>
            <div className="row">
              <div className="col-12 border bg-light">
                <ActiveVideo
                    key="x"
                    item={this.state.selectedVideo}>
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
                item={item}
                onClick={selectVideo}>
              </VideoEmbed> 
            )}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
