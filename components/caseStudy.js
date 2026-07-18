import styled from "styled-components";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { colors } from "../styles/colors";
import { devices } from "../styles/devices";
import { MARGIN_X, MARGIN_Y_LG } from "../styles/layout";

const Panel = styled.section`
  box-sizing: border-box;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  min-height: 100dvh;
  padding: ${MARGIN_Y_LG}rem ${MARGIN_X}vw;
  scroll-snap-align: start;
  background-color: ${props => props.$background};
  color: ${props => props.$text};

  h1, h2, h3, h4, h5, h6, p, a, li {
    color: inherit;
  }

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`

const Section = styled.div`
  margin: 0 0 6em;

  &:last-child {
    margin-bottom: 0;
  }
`

const ImageRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2em;
  margin-bottom: 2em;

  @media ${devices.tabletLandscape} {
    flex-direction: column;
    gap: 1.5em;
  }
`

const Primary = styled.div`
  flex: 1;
  min-width: 0;
`

const Secondary = styled.div`
  flex: 0 0 33%;

  @media ${devices.tabletLandscape} {
    align-self: stretch;
  }
`

const Text = styled.div`
  width: 66.66%;

  @media ${devices.tabletLandscape} {
    width: 100%;
  }
`

const SectionTitle = styled.h3`
  margin: 0 0 0.75em;
`

export default function CaseStudy({ data }) {
  return (
    <Panel
      id="case-study"
      $background={data.main_color || colors.primaryLight}
      $text={data.text_color || colors.primaryDark}
    >
      {data.sections.map((section, index) => (
        <Section key={index}>
          {(section.image?.url || section.image_secondary?.url) && (
            <ImageRow>
              {section.image?.url && (
                <Primary>
                  <PrismicNextImage field={section.image} />
                </Primary>
              )}
              {section.image_secondary?.url && (
                <Secondary>
                  <PrismicNextImage field={section.image_secondary} />
                </Secondary>
              )}
            </ImageRow>
          )}
          <Text>
            {section.section_title?.[0]?.text && (
              <SectionTitle>{section.section_title[0].text}</SectionTitle>
            )}
            <PrismicRichText field={section.text} />
          </Text>
        </Section>
      ))}
    </Panel>
  )
}
