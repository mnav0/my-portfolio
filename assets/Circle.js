import React from 'react';

const Circle = ({ size }) => {
  return (
    <svg height={size ? size : "66"} width={size ? size : "66"}>
      <circle
        cx={size ? size / 2 : "33"}
        cy={size ? size / 2 : "33"}
        r={size ? size / 2 : "33"}
        fill="#D6A1E9"
      />
    </svg>
  )
}

export default Circle;