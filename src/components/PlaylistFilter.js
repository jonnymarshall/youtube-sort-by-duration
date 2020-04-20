import React, { Component } from 'react'

export default class PlaylistFilter extends Component {
  render() {
    const {onChange, playlistSearch} = this.props
    return (
      <>
        <input
            className="form-control form-control-lg"
            type="text" placeholder="Search playlists..."
            onChange={onChange}
            value={playlistSearch}
          >
          </input>
      </>
    )
  }
}
