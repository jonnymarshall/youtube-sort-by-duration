import React, { Component } from 'react'
import moment from 'moment'
import styled from 'styled-components'

const VideoEmbedItem = styled.div `
  max-width: 100%;
  max-height: 100%;
`

export default class VideoEmbed extends Component {
  
  render() {
    const { item } = this.props
    return (
      <VideoEmbedItem className="col py-2 px-lg-2 border bg-light">
        <iframe
          key={item.id}
          duration={moment.duration(item.duration).asMilliseconds()}
          src={`https://www.youtube.com/embed/${item.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          >
        </iframe>
      </VideoEmbedItem>
    )
  }
}