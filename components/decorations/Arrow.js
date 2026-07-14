import React from 'react';
import { colors } from "../../styles/colors";

const Arrow = ({ stroke }) => {
  return (
    <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M8.35358 0V19M15.8536 11L8.35358 19L0.353577 11" stroke={stroke ?? colors.action}/>
     </svg>
  )
}

export default Arrow;