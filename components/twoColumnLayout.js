import styled from "styled-components";
import { Link } from "react-scroll";
import { PrismicRichText } from "@prismicio/react";
import { devices } from "../styles/devices";
import TextLink from "../components/textLink";
import HeadingWithSprinkle from "../components/headingWithSprinkle";
import { MARGIN_Y_LG, MARGIN_Y_SM, COLUMN_WIDTH_LG, COLUMN_WIDTH_MD, COLUMN_WIDTH_SM, SCROLL_DURATION } from "../styles/layout";
import Arrow from "../components/decorations/Arrow";
import { richTextComponents } from "../components/richText";

const Background = styled.div`
  position: relative;
  margin: 0;
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
  width: ${COLUMN_WIDTH_LG};

  h3, h4, h5, h6 {
    margin: 0 0 0.25em;
  }

  p {
    margin: 0;
  }

  p:last-child {
    margin-bottom: ${MARGIN_Y_SM};
  }

  img {
    width: 100%;
    height: auto;
  }

  @media ${devices.tabletPortrait} {
    width: ${COLUMN_WIDTH_MD};
  }

  @media ${devices.mobile} {
    width: ${COLUMN_WIDTH_SM};
  }
`

const Footer = ({ padding, ...props}) => <div {...props}></div>

const ColumnFooter = styled(Footer)`
  margin-top: ${props => props.padding || MARGIN_Y_SM};
`

const CtaRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: ${MARGIN_Y_LG};

  @media ${devices.tabletLandscape} {
    flex-direction: column;
    align-items: flex-start;
    gap: 2em;
  }
`

const LinksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: ${COLUMN_WIDTH_LG};

  & a {
    display: block;
    width: 10em;
    margin: 0.5em 0 0;
  }

  @media ${devices.tabletPortrait} {
    width: ${COLUMN_WIDTH_MD};
  }

  @media ${devices.mobile} {
    width: ${COLUMN_WIDTH_SM};
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
  decorationsReverse
}) {
  const linksList = (
    <LinksContainer>
      {links?.map((l, i) => (
        <TextLink link={l.link} label={l.link_label} newTab={l.link.target || l.link_label == "resume"} key={i} />
      ))}
    </LinksContainer>
  );

  return (
    <Background>
      <TextContainer>
        <ColumnContainer>
          <HeadingWithSprinkle heading={heading} decorations={decorations} />
          {headingReverse && <HeadingWithSprinkle heading={headingReverse} decorations={decorationsReverse} reverse /> }
          {subheading && !scrollTo && (
            <ColumnFooter padding={MARGIN_Y_LG}>
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
            <ColumnFooter padding={MARGIN_Y_LG}>
              {linksList}
            </ColumnFooter>
          )}
        </ColumnContainer>
      </TextContainer>
      {scrollTo && subheading && (
        <CtaRow>
          <SubheadingLink to={scrollTo} smooth duration={SCROLL_DURATION} offset={0}>
            {subheading}
            <Arrow />
          </SubheadingLink>
          {linksList}
        </CtaRow>
      )}
    </Background>
  )
}
