import React, { Component } from 'react'

export default class ActiveVideo extends Component {
  render() {
    const { item } = this.props
    return (
      <iframe
        key={item.id}
        src={`https://www.youtube.com/embed/${item.id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        height="600px"
        width="100%"
        >
      </iframe>
    )
  }
}