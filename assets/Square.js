import React from 'react';

const Square = ({ size }) => {
  return (
    <svg height={size ? size : "66"} width={size ? size : "66"}>
      <rect height={size ? size : "66"} width={size ? size : "66"} fill="#FFE073"/>
    </svg>
  )
}

export default Square;