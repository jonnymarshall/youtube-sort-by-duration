import React, { Component } from 'react'
import Card from './Card'

export default class PlaylistVideos extends Component {
  render() {
    const { selectedPlayListItems } = this.props
    return (
      <div>
        <ul>
          { selectedPlayListItems.map(video => <Card
            // id={playlist.id}
            // key={playlist.id}
            // title={playlist.snippet.title}
            // thumbnail={playlist.snippet.thumbnails.default.url}
            // apiKey={apiKey}
            // getSelectedPlaylistItems={getSelectedPlaylistItems}
          />)}
        </ul>
      </div>
    )
  }
}
