import React, { Component } from 'react'
import styled from 'styled-components'

const Thumbnail = styled.img `
  max-width: 100%;
`

export default class Card extends Component {
  render() {
    const { title, onClick, id, thumbnail } = this.props
    return (
      <div className="col py-2 px-lg-2 border bg-light">
        <Thumbnail src={thumbnail} alt=""/>
        <h5>{title}</h5>
        <button onClick={() => onClick(id)} type="button" className="btn btn-primary btn-lg btn-block">Get videos</button>
      </div>
    )
  }
}
