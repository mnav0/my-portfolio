import React from 'react';
import styled from "styled-components";
import { devices } from "../styles/devices";

const Line = ({ reverse, ...props}) => <div {...props}></div>

const LineContainer = styled(Line)`
  display: flex;
  align-items: center;

  & h1, h2 {
    margin: ${props => props.reverse ? "0 0 0 0.25em" : "0 0.25em 0 0"};
    line-height: 1;
  }

  @media ${devices.mobile} {
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

export default function HeadingWithSprinkle({ heading, decorations, reverse }) {
  
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
    <LineContainer reverse={reverse}>
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