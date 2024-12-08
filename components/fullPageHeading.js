import Link from "next/link";
import styled from "styled-components";
import { colors } from "../styles/colors";

const HeadingWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: ${colors.primaryDark};
  width: 100vw;
  top: -1em;
  left: -5.5vw;
  padding: 4em 5.5vw 0.25em 5.5vw;

  p {
    color: ${colors.primaryLight};
  }
`

const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`

const Title = styled.p`
  max-width: 100em;
`

const Date = styled.p`
  margin-left: 2em;
`

const SubContent = styled.p`
  text-transform: uppercase;
  margin-top: 0;
  border-bottom: 1px solid ${colors.primaryDark};
  position: relative;
  width: 100vw;
  top: -0.75em;
  left: -5.5vw;
  padding: 1em 5.5vw;
`


export default function FullPageHeading({ heading, subheading, accentText }) {
  return (
    <>
      <HeadingWrapper>
        <Content>
          <Title><strong>{heading}</strong></Title>
          <Date>{accentText}</Date>
        </Content>
      </HeadingWrapper>
      {subheading && 
        <SubContent>
          {subheading}
        </SubContent>
      }
    </>
  )
}
