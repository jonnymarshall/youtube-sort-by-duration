import React, { Component } from 'react'

export default class VideoEmbed extends Component {
  
  render() {
    const { item } = this.props
    
    return (
      <iframe
        key={item.id}
        width="640"
        height="360"
        src={`https://www.youtube.com/embed/${item.id}`}
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen>
      </iframe>
    )
  }
}