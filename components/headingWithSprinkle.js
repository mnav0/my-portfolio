import React from 'react';
import styled from "styled-components";
import { devices } from "../styles/devices";

const LineContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  & h1, h2 {
    margin: ${props => props.reverseHeadingBelow ? "0" : "0 0 0 0.5em"};
    line-height: 1;
  }

  @media ${devices.mobile} {
    align-items: flex-start;

    & h1, h2 {
      margin-top: 0.1em;
    }
  }
`

const SprinklesContainer = styled.div`
  position: relative;

  & svg:nth-child(2) {
    position: absolute;
    top: 0.5em;
    left: 0.5em;
  }
`

export default function HeadingWithSprinkle({ heading, decorations, reverse, reverseHeadingBelow }) {
  
  const sprinklesComponent =
    <SprinklesContainer>
      {decorations?.map((component, index) => (
        <React.Fragment key={index}>
          {component}
        </React.Fragment>
      ))}
    </SprinklesContainer>

  const headingComponent = <h2>{heading}</h2>;

  return (
    <LineContainer reverseHeadingBelow>
      {reverse ?
        <React.Fragment>
          {sprinklesComponent}
          {headingComponent}
        </React.Fragment> :
        <React.Fragment>
          {headingComponent}
          {sprinklesComponent}
        </React.Fragment>
      }
    </LineContainer>
  )
}