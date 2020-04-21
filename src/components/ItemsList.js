import React, { Component } from 'react'
import Card from './Card'


export default class ItemsList extends Component {

  render() {
    const { items, onClick } = this.props
    return (
      <>
        {items && items.map((item, index) =>
          <Card
            key={index}
            id={item.id}
            title={item.title}
            thumbnail={item.thumbnail}
            duration={item.duration}
            onClick={onClick}
          ></Card>
        )}
      </>
    )
  }
}