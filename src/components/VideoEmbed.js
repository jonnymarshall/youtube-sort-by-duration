import React, { Component } from 'react'
import moment from 'moment'
import styled from 'styled-components'

const DetailsBlock = styled.div `
  height: 180px;
  overflow: scroll;
`

export default class VideoEmbed extends Component {
  render() {
    const { item, size, onClick } = this.props
    const height = (size === "large") ? "400px" : "100%"
    return (
      <div
      onClick={() => onClick(item.id)}
      key={item.id}>
        <li class="media">
        <div>
          <img src={item.thumbnail} className="mr-3" alt="..."></img>
          <h3>{moment.duration(item.duration).minutes()} minutes</h3>
        </div>

          <DetailsBlock class="media-body">
            <h5 class="mt-0 mb-1">{item.title}</h5>
            <p>{item.description}</p>
          </DetailsBlock>
        </li>
      </div>
    )
  }
}