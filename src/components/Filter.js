// import React, { Component } from 'react'
import React, { useState, useEffect, Component } from "react";

const Filter = (props) => {
  const {onChange, placeholder, value} = props;
  
  return (
    <>
      <input
          className="form-control form-control-lg"
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        >
        </input>
    </>
  )
}

export default Filter