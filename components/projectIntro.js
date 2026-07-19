import styled from "styled-components";
import { scroller } from "react-scroll";
import { PrismicRichText } from "@prismicio/react";
import { colors } from "../styles/colors";
import { devices } from "../styles/devices";
import { MARGIN_X, MARGIN_Y_LG, MARGIN_Y_SM, SCROLL_DURATION } from "../styles/layout";
import Navigation from "../components/navigation";
import Button from "../components/button";
import Arrow from "../components/decorations/Arrow";

const Panel = styled.section`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-top: -${MARGIN_Y_LG};
  padding: ${MARGIN_Y_LG} 0 0;
  scroll-snap-align: start;
`

const Header = styled.div`
  padding: 0 ${MARGIN_X}vw;
`

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: ${MARGIN_Y_LG};
  padding: ${MARGIN_Y_SM} ${MARGIN_X}vw;
  border: 1px solid ${colors.action};
`

const TagsLabel = styled.p`
  position: absolute;
  top: 0;
  left: calc(${MARGIN_X}vw - 1em);
  transform: translateY(-50%);
  margin: 0;
  padding: 0 1em;
  background: ${colors.primaryLight};
`

const Body = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  gap: 2em;
  padding-top: ${MARGIN_Y_LG};

  @media ${devices.tabletLandscape} {
    flex-direction: column;
    gap: 0;
    padding-top: ${MARGIN_Y_SM};
  }
`

const Title = styled.div`
  width: 41.66%;

  h3 {
    margin: 0;
  }

  @media ${devices.tabletLandscape} {
    width: 100%;
  }
`

const Details = styled.div`
  width: 58.33%;

  @media ${devices.tabletLandscape} {
    width: 100%;
  }
`

const Meta = styled.dl`
  margin: ${MARGIN_Y_LG} 0 0;
  border-top: 1px solid ${colors.callout};
`

const MetaRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2em;
  margin-top: ${MARGIN_Y_SM};

  dt {
    text-transform: uppercase;
  }

  dd {
    margin: 0;
    text-align: right;
  }
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 2em;
  margin-top: ${MARGIN_Y_SM};

  @media ${devices.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 1em;
  }
`

const DiagonalArrow = styled.span`
  display: inline-flex;
  transform: rotate(-135deg);
`

const ComingSoon = styled.h5`
  margin: 0;
`

export default function ProjectIntro({ data, tags }) {
  const scrollToCaseStudy = () => {
    scroller.scrollTo("case-study", { smooth: true, duration: SCROLL_DURATION });
  };

  return (
    <Panel>
      <Header>
        <Navigation />
      </Header>
      <Card>
        <TagsLabel className="link">{tags?.join(" - ")}</TagsLabel>
        <Body>
          <Title>
            <h3>{data.title1?.[0]?.text}</h3>
          </Title>
          <Details>
            <PrismicRichText field={data.description} />
            <Meta>
              {data.when && (
                <MetaRow>
                  <dt>When</dt>
                  <dd>{data.when}</dd>
                </MetaRow>
              )}
              {data.where && (
                <MetaRow>
                  <dt>Where</dt>
                  <dd>{data.where}</dd>
                </MetaRow>
              )}
              {data.who && (
                <MetaRow>
                  <dt>Who</dt>
                  <dd>{data.who}</dd>
                </MetaRow>
              )}
            </Meta>
          </Details>
        </Body>
        <Footer>
          {data.case_study && data.sections?.length > 0 ? (
            <Button onClick={scrollToCaseStudy}>
              Case Study
              <Arrow />
            </Button>
          ) : (
            <ComingSoon>Case Study Coming Soon</ComingSoon>
          )}
          {data.live_site?.url && (
            <Button variant="solid" href={data.live_site.url}>
              Live Site
              <DiagonalArrow><Arrow stroke={colors.primaryLight} /></DiagonalArrow>
            </Button>
          )}
        </Footer>
      </Card>
    </Panel>
  )
}
