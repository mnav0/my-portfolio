import { client } from "../prismicConfiguration";
import styled from "styled-components"
import GlobalStyle from "../styles/globalStyles";
import { colors } from "../styles/colors";
import { devices } from "../styles/devices";
import Head from "next/head";
import Square from "../components/decorations/Square";
import Circle from "../components/decorations/Circle";
import Sprinkle from "../components/decorations/Sprinkle";
import TwoColumnLayout from "../components/twoColumnLayout";

const BlockContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  background-color: ${colors.action};

  @media ${devices.tabletLandscape} {
    height: 15em;
  }
`

const PageContainer = styled.div`
  margin-top: 40vh;
`

export default function Home({ homepage }) {
  const data = homepage.data;
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

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Magdalena Navracruz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BlockContainer />
      <PageContainer>
        <TwoColumnLayout
          heading={titleSplit[0]}
          headingReverse={titleSplit[1]}
          subheading={data.subtitle[0].text}
          description={data.description} 
          links={data.links} 
          decorations={decorations[0]}
          decorationsReverse={decorations[1]}
          callout={data.show_callout && data.callout}
        />
      </PageContainer>
    </>
  )
}

export async function getStaticProps() {
  const res = await client.query();
  const homepage = await client.getSingle("homepage");

  return {
    props: {
      homepage
    },
  };
}