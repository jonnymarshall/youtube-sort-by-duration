import React, { Component } from 'react'

export default class Card extends Component {
  render() {
    const { title, duration, thumbnail } = this.props
    return (
      <div>
        <h1>{title}</h1>
        <h2>{duration}</h2>
        <img src={thumbnail} alt=""/>
      </div>
    )
  }
}
