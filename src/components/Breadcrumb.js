import React, { Component } from 'react'

const Breadcrumb = (props) => {
    console.log(props)
    const {onClick, selectedPlaylist} = props
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#" onClick={onClick}>My playlists</a></li>
            {selectedPlaylist &&
              <li className="breadcrumb-item"><a href="#">{selectedPlaylist.title}</a></li>
            }
            {/* <li class="breadcrumb-item active" aria-current="page">Data</li> */}
          </ol>
        </nav>
      </>
    )
}

export default Breadcrumb