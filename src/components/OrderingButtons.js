import React, { Component } from 'react'

const OrderingButtons = (props) => {
  const {toggleOrderBy, orderBy} = props
  return (
    <div className="btn-group mx-auto w-100 p-3" role="group" aria-label="Basic example">
      <button
        type="button"
        className={`btn btn-${orderBy === "shortest" ? "primary" : "secondary"} btn-lg`}
        onClick={() => toggleOrderBy("shortest")}>
          Shortest First
      </button>
      <button
        type="button"
        className={`btn btn-${orderBy === "longest" ? "primary" : "secondary"} btn-lg`}
        onClick={() => toggleOrderBy("longest")}>
          Longest First
      </button>
    </div>
  )
}

export default OrderingButtons
