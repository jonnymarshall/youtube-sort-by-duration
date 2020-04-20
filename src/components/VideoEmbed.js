import React, { Component } from 'react'
import moment from 'moment'
import styled from 'styled-components'

export default class VideoEmbed extends Component {
  
  render() {
    const { item, size } = this.props
    const height = (size === "large") ? "400px" : "100%"
    return (
      <>
        <li class="media">
          <img src={item.thumbnail} class="mr-3" alt="..."></img>
          <div class="media-body">
            <h5 class="mt-0 mb-1">{item.title}</h5>
              {item.description}
          </div>
        </li>
        {/* <iframe
          key={item.id}
          duration={moment.duration(item.duration).asMilliseconds()}
          src={`https://www.youtube.com/embed/${item.id}`}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen="true"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          height={height}
          width="100%"
          >
        </iframe> */}
      </>
    )
  }
}