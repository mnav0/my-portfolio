import React from 'react';
import { colors } from "../../styles/colors";

const DEFAULT_SIZE = 42;
const SMALL_SIZE = 27;

const Sprinkle = ({ size, stroke }) => {
  const isSmallSize = size === "small";
  const dimension = isSmallSize ? SMALL_SIZE : DEFAULT_SIZE;
  const color = stroke ?? colors.action;

  return (
    <svg width={dimension} height={dimension} fill="none">
      {isSmallSize ? 
        <path d="M17.2565 1.35215L13.414 5.91408L8.59491 2.0421L8.77881 7.68288L2.45214 6.56114L5.94253 11.9409L1.23603 14.5509L6.44901 16.3778L4.00871 21.4588L9.72222 19.6922L10.9123 25.0291L14.3237 20.9251L18.5318 24.7768L18.6718 19.6529L24.4591 20.4867L21.2568 15.7576L26.3225 12.9572L21.0016 10.958L24.0534 6.47092L18.0156 7.14705L17.2565 1.35215Z" 
          stroke={stroke} 
          strokeWidth="2" 
          strokeLinejoin="bevel"
          /> :        
          <path fillRule="evenodd" clipRule="evenodd" d="M21 6.24419L26.3549 1L28.3789 8.21881L35.6378 6.36223L33.7812 13.6211L41 15.6451L35.7558 21L41 26.3549L33.7812 28.3789L35.6378 35.6378L28.3789 33.7812L26.3549 41L21 35.7558L15.6451 41L13.6211 33.7812L6.36223 35.6378L8.21881 28.3789L1 26.3549L6.24419 21L1 15.6451L8.21881 13.6211L6.36223 6.36223L13.6211 8.21881L15.6451 1L21 6.24419Z" 
            stroke={color} 
            strokeWidth="2" 
            strokeLinejoin="bevel" />
          }
    </svg>
  )
}

export default Sprinkle;