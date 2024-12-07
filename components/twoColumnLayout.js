import styled from "styled-components";
import { devices } from "../styles/devices";
import TextLink from "../components/textLink";
import HeadingWithSprinkle from "./headingWithSprinkle";
import { RichText } from "prismic-reactjs";
import { colors } from "../styles/colors";
import Swoop from "../components/decorations/Swoop";

const PADDING_LARGE = "12.4em";
const PADDING_MEDIUM = "6em";

const Background = styled.div`
  position: relative;
  margin: 6rem 0;

  ${({ darkMode }) => darkMode && `
    background-color: ${colors.primaryDark};
    width: 100vw;
    left: -5.5vw;
    padding: 6rem 5.5vw 0 5.5vw;

    h1, h2, p {
      color: ${colors.primaryLight};
    }

    h3, h4, h5, a {
      color: ${colors.accentText};
    }
  `}
`

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${devices.tabletLandscape} {
    flex-direction: column;
  }
`

const ColumnContainer = styled.div`
  position: relative;
  max-width: 25em;

  h3, h4, h5, h6 {
    margin: 0 0 0.25em;
  }

  p {
    margin: 0;
  }

  p:last-child {
    margin-bottom: 2em;
  }

  @media ${devices.tabletPortrait} {
    max-width: 22em;
  }

  @media ${devices.mobile} {
    max-width: 18em;
  }
`

const CalloutContainer = styled.div`
  margin-top: 5em;
  position: relative;

  & svg {
    position: absolute;
    z-index: -1;
    top: -3em;
    left: -3em;
  }

  @media ${devices.mobile} {
    & svg {
      max-width: 100%;
      left: 0;
      overflow: hidden;
    }
`

const ColumnFooter = styled.div`
  margin-top: ${props => props.padding || "2em"};
`

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  
  & a {
    display: block;
    width: 10em;
    margin: 0.5em 0 0;
  }
`

export default function TwoColumnLayout({ 
  heading, 
  headingReverse, 
  subheading,
  description, 
  links, 
  decorations, 
  decorationsReverse, 
  callout,
  darkMode 
}) {
  const extLinkResolver = (doc) => {
    if (doc.link_type === "Document") {
      return `/${doc.slug}`;
    } else if (doc.link_type === "Web" || doc.link_type === "Media") {
      return doc.url;
    } else {
      return "/";
    }
  }

  return (
    <Background darkMode={darkMode}>
      <TextContainer>
        <ColumnContainer>
          <HeadingWithSprinkle heading={heading} decorations={decorations} />
          {headingReverse && <HeadingWithSprinkle heading={headingReverse} decorations={decorationsReverse} reverse /> }
          <ColumnFooter padding={PADDING_LARGE}>
            <h3>{subheading}</h3>
          </ColumnFooter>
        </ColumnContainer>
        <ColumnContainer>
          {description?.map((content, index) => {
            return (
              content?.text_block_title ?
                <div key={index}>
                  <h3>{content.text_block_title[0].text}</h3>
                  {RichText.render(content.text_block_description, extLinkResolver)}
                </div> :
                <div key={index}>
                  {RichText.render([content], extLinkResolver)}
                </div>
            )
          })}

          {callout && 
            <CalloutContainer>
              <Swoop />
              {RichText.render(callout, extLinkResolver)}
            </CalloutContainer>
          }
  
          <ColumnFooter padding={PADDING_MEDIUM}>
            <LinksContainer>
              {links?.map((l, i) => {
                return (
                  <TextLink link={l.link} label={l.link_label} newTab={l.link.target || l.link_label == "resume"} key={i} large />
                )
              })}
            </LinksContainer>
          </ColumnFooter>
        </ColumnContainer>
      </TextContainer>
    </Background>
  )
}