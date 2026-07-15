import styled from "styled-components";
import { Link } from "react-scroll";
import { PrismicRichText } from "@prismicio/react";
import { devices } from "../styles/devices";
import TextLink from "../components/textLink";
import HeadingWithSprinkle from "./headingWithSprinkle";
import { colors } from "../styles/colors";
import Arrow from "../components/decorations/Arrow";

const PADDING_LARGE = "8em";
const PADDING_MEDIUM = "6em";

const BackgroundContainer = ({ darkMode, ...props }) => <div {...props}></div>

const Background = styled(BackgroundContainer)`
  position: relative;
  margin: 0;

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
  width: 25em;

  h3, h4, h5, h6 {
    margin: 0 0 0.25em;
  }

  p {
    margin: 0;
  }

  p:last-child {
    margin-bottom: 2em;
  }

  img {
    width: 100%;
    height: auto;
  }

  @media ${devices.tabletPortrait} {
    width: 22em;
  }

  @media ${devices.mobile} {
    width: 18em;
  }
`

const Footer = ({ padding, ...props}) => <div {...props}></div>

const ColumnFooter = styled(Footer)`
  margin-top: ${props => props.padding || "2em"};
`

const CtaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 10em;

  @media ${devices.tabletLandscape} {
    flex-direction: column;
    align-items: flex-start;
    gap: 2em;
    margin-top: 4em;
  }
`

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 25em;

  & a {
    display: block;
    width: 10em;
    margin: 0.5em 0 0;
  }

  @media ${devices.tabletPortrait} {
    width: 22em;
  }

  @media ${devices.mobile} {
    width: 18em;
  }
`

const SubheadingLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4em;
  cursor: pointer;

  @media ${devices.mobile} {
    font-size: 1rem;
  }
`

export default function TwoColumnLayout({ 
  heading, 
  headingReverse, 
  subheading,
  scrollTo,
  description, 
  links, 
  decorations, 
  decorationsReverse, 
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
  };

  const richTextComponents = {
    hyperlink: ({ node, children }) => {
      const href = extLinkResolver(node.data);
      const target = node.data.target;
      return (
        <a
          href={href}
          target={target}
          rel={target === "_blank" ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  };

  const linksList = (
    <LinksContainer>
      {links?.map((l, i) => (
        <TextLink link={l.link} label={l.link_label} newTab={l.link.target || l.link_label == "resume"} key={i} large />
      ))}
    </LinksContainer>
  );

  return (
    <Background darkMode={darkMode}>
      <TextContainer>
        <ColumnContainer>
          <HeadingWithSprinkle heading={heading} decorations={decorations} />
          {headingReverse && <HeadingWithSprinkle heading={headingReverse} decorations={decorationsReverse} reverse /> }
          {subheading && !scrollTo && (
            <ColumnFooter padding={PADDING_LARGE}>
              <h3>{subheading}</h3>
            </ColumnFooter>
          )}
        </ColumnContainer>
        <ColumnContainer>
          {description?.map((content, index) => (
            content?.text_block_title ? (
              <div key={index}>
                <h3>{content.text_block_title[0].text}</h3>
                <PrismicRichText
                  field={content.text_block_description}
                  components={richTextComponents}
                />
              </div>
            ) : (
              <div key={index}>
                <PrismicRichText
                  field={[content]}
                  components={richTextComponents}
                />
              </div>
            )
          ))}
          {!scrollTo && (
            <ColumnFooter padding={PADDING_MEDIUM}>
              {linksList}
            </ColumnFooter>
          )}
        </ColumnContainer>
      </TextContainer>
      {scrollTo && subheading && (
        <CtaRow>
          <SubheadingLink to={scrollTo} smooth duration={600} offset={0}>
            {subheading}
            <Arrow />
          </SubheadingLink>
          {linksList}
        </CtaRow>
      )}
    </Background>
  )
}
