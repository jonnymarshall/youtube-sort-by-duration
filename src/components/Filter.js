import React, { Component } from 'react'

export default class Filter extends Component {
  render() {
    const {onChange, playlistSearch, placeholder} = this.props
    return (
      <>
        <input
            className="form-control form-control-lg"
            type="text" placeholder={placeholder}
            onChange={onChange}
            value={playlistSearch}
          >
          </input>
      </>
    )
  }
}
