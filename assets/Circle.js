import React from 'react';
import { colors } from "../styles/colors"

const DEFAULT_SIZE = 24;

const Circle = ({ size, fill }) => {
  const dimension = size ?? DEFAULT_SIZE;
  const color = fill ?? colors.action;

  return (
    <svg height={dimension} width={dimension}>
      <circle
        cx={dimension / 2}
        cy={dimension / 2}
        r={dimension / 2}
        fill={color}
      />
    </svg>
  )
}

export default Circle;