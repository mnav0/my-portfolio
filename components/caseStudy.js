import styled from "styled-components";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { colors } from "../styles/colors";
import { devices } from "../styles/devices";
import { MARGIN_X, MARGIN_Y_LG, MARGIN_Y_SM } from "../styles/layout";
import Button from "../components/button";
import Arrow from "../components/decorations/Arrow";

const PanelContainer = ({ background, text, $themed, ...props }) => <section {...props}></section>

const Panel = styled(PanelContainer)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  min-height: 100dvh;
  padding: ${MARGIN_Y_LG} ${MARGIN_X}vw;
  scroll-snap-align: start;
  background-color: ${props => props.background || "transparent"};
  color: ${props => props.text};

  ${(props) => props.$themed && `
    h1, h2, h3, h4, h5, h6, p, li {
      color: inherit;
    }
  `}

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`

const Section = styled.div`
  margin: 0 0 ${MARGIN_Y_LG};
`

const ImageRow = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: ${MARGIN_Y_SM};

  @media ${devices.tabletLandscape} {
    flex-direction: column;
    gap: 1.5em;
  }
`

const Primary = styled.div`
  flex: 1;
  min-width: 0;

  @media ${devices.tabletLandscape} {
    align-self: stretch;
  }
`

const Secondary = styled.div`
  flex: 0 0 33%;
  padding-left: 1em;

  @media ${devices.tabletLandscape} {
    align-self: stretch;
    padding-left: 0;
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

const Hero = styled.div`
  width: 100%;
  margin-bottom: ${MARGIN_Y_LG};

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2em;
  margin-top: auto;

  @media ${devices.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 1em;
  }
`

const NavButton = styled(Button)`
  ${(props) => props.$themed ? `
    && {
      border-color: currentColor;
      color: inherit;
    }

    svg path {
      stroke: currentColor;
    }
  ` : `
    && {
      border-color: ${colors.action};
      color: ${colors.action};
    }

    svg path {
      stroke: ${colors.action};
    }
  `}
`

const RightArrow = styled.span`
  display: inline-flex;
  transform: rotate(-90deg);
`

function CaseStudyFooter({ nextProject, themed }) {
  return (
    <Footer>
      <NavButton href="/#work" $themed={themed}>Back to Work</NavButton>
      {nextProject?.uid && (
        <NavButton href={`/projects/${nextProject.uid}`} $themed={themed}>
          Next Project
          <RightArrow>
            <Arrow />
          </RightArrow>
        </NavButton>
      )}
    </Footer>
  )
}

export default function CaseStudy({ data, nextProject, preview }) {
  const hasCustomBackground = !preview && !!data.main_color;
  const background = hasCustomBackground ? data.main_color : null;
  const text = (!preview && data.text_color) || colors.primaryDark;

  return (
    <Panel
      id="case-study"
      background={background}
      text={text}
      $themed={!preview}
    >
      {preview ? (
        data.hero?.url && (
          <Hero>
            <PrismicNextImage field={data.hero} fallbackAlt="" />
          </Hero>
        )
      ) : (
        data.sections.map((section, index) => (
          <Section key={index}>
            <Text>
              {section.section_title?.[0]?.text && (
                <SectionTitle>{section.section_title[0].text}</SectionTitle>
              )}
              <PrismicRichText field={section.text} />
            </Text>
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
          </Section>
        ))
      )}
      <CaseStudyFooter nextProject={nextProject} themed={hasCustomBackground} />
    </Panel>
  )
}
