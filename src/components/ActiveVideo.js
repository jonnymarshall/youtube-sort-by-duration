import React, { Component } from 'react'

export default class ActiveVideo extends Component {
  
  render() {
    const { item, size } = this.props
    const height = (size === "large") ? "400px" : "100%"
    return (
      <iframe
        key={item.id}
        // duration={moment.duration(item.duration).asMilliseconds()}
        src={`https://www.youtube.com/embed/${item.id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        height={height}
        width="100%"
        >
      </iframe>
    )
  }
}