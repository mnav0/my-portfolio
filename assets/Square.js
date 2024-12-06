import React from 'react';
import { colors } from "../styles/colors"

const DEFAULT_SIZE = 40;

const Square = ({ size, fill }) => {
  const dimension = size ?? DEFAULT_SIZE;
  const color = fill ?? colors.action;

  return (
    <svg height={dimension} width={dimension}>
      <rect height={dimension} width={dimension} fill={color}/>
    </svg>
  )
}

export default Square;