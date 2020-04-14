import React, { Component } from 'react'
import Card from './Card'


export default class ItemsList extends Component {

  render() {
    // console.log(this.props)
    const { items, onClick } = this.props
    return (
      <div>
        {items && items.map((item) => 
          <React.Fragment>
            <Card
              key={item.id}
              title={item.title}
              thumbnail={item.thumbnail}
              duration={item.duration}
            ></Card>
            <button onClick={() => onClick(item.id)}>Get videos</button>
          </React.Fragment>
        )}
      </div>
    )
  }
}