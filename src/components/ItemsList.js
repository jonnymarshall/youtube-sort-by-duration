import React, { Component } from 'react'
import Card from './Card'


export default class ItemsList extends Component {

  render() {
    // console.log(this.props)
    const { items, onClick } = this.props
    return (
      <React.Fragment>
        {items && items.map((item) =>
        <>
            <Card
              key={item.id}
              id={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              duration={item.duration}
              onClick={onClick}
            ></Card>
          </>
        )}
      </React.Fragment>
    )
  }
}