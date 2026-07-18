import { useRef } from "react";
import { client } from "../prismic";
import styled from "styled-components";
import { colors } from "../styles/colors";
import { devices } from "../styles/devices";
import { MARGIN_X } from "../styles/layout";
import Square from "../components/decorations/Square";
import Circle from "../components/decorations/Circle";
import Sprinkle from "../components/decorations/Sprinkle";
import TwoColumnLayout from "../components/twoColumnLayout";
import FloatingCallout from "../components/floatingCallout";
import GlobalHeader from "../components/globalHeader";
import WorkExplorer from "../components/workExplorer";

const HeroSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100dvh;
  width: 100vw;
  margin-top: -4rem;
  margin-left: calc(50% - 50vw);
  padding: 1em 0 2.5rem;
`;

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 1em;
  background-color: ${colors.action};
`;

const Arena = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  min-height: 10em;
  overflow: hidden;

  @media ${devices.mobile} {
    min-height: 8em;
  }
`;

const PageContainer = styled.div`
  flex: 0 0 auto;
  padding: 0 ${MARGIN_X}%;
`;

const WorkSection = styled.section`
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 100dvh;
  margin-left: calc(50% - 50vw);
  margin-bottom: -2rem;

  @media ${devices.tabletPortrait} {
    height: auto;
  }
`;

export default function Home({ homepage, projects }) {
  const { data } = homepage;
  const arenaRef = useRef(null);

  if (data) {
    const titleSplit = data.title[0].text.split(" ");

    const decorations = [
      [
        <Square fill={colors.accentSparkle} />,
        <Circle fill={colors.accentText} />
      ],
      [
        <Sprinkle />
      ]
    ];

    const contactHref = data.links?.find(
      (l) => l.link_label?.toLowerCase() === "contact me"
    )?.link?.url;

    return (
      <>
        <GlobalHeader />
        <HeroSection>
          <TopBar />
          <Arena ref={arenaRef}>
            {data.show_callout && data.callout && (
              <FloatingCallout
                callout={data.callout}
                arenaRef={arenaRef}
                href={contactHref}
              />
            )}
          </Arena>
          <PageContainer>
            <TwoColumnLayout
              heading={titleSplit[0]}
              headingReverse={titleSplit[1]}
              subheading={data.subtitle[0].text}
              scrollTo="work"
              description={data.description}
              links={data.links}
              decorations={decorations[0]}
              decorationsReverse={decorations[1]}
            />
          </PageContainer>
        </HeroSection>
        <WorkSection id="work">
          <WorkExplorer projects={projects} />
        </WorkSection>
      </>
    )
  }
}

export async function getStaticProps() {
  const [homepage, projects] = await Promise.all([
    client.getSingle("homepage"),
    client.getAllByType("project"),
  ]);

  return {
    props: {
      homepage,
      projects,
    },
  };
}
