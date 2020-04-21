import React, { Component } from 'react'

const Breadcrumb = (props) => {
  const {resetVideoSelections, resetAllSelections, selectedPlaylist, selectedVideo} = props
  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#" onClick={resetAllSelections}>My playlists</a>
            </li>
          {selectedPlaylist &&
            <li className="breadcrumb-item">
              <a href="#" onClick={resetVideoSelections}>{selectedPlaylist.title}</a>
              </li>
          }
          {selectedVideo &&
            <li className="breadcrumb-item">{selectedVideo.title}</li>
          }
        </ol>
      </nav>
    </>
  )
}

export default Breadcrumb