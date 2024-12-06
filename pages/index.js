import { client } from "../prismicConfiguration";
import { RichText } from "prismic-reactjs";
import styled from "styled-components"
import GlobalStyle from "../styles/globalStyles";
import { colors } from "../styles/colors"
import { devices } from "../styles/devices"
import Head from "next/head";
import ArrowLink from "../components/arrowLink";
import Square from "../assets/Square";
import Circle from "../assets/Circle";
import Sprinkle from "../assets/Sprinkle";
import Swoop from "../assets/Swoop";

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
  min-height: 22em;

  & h1 {
    margin: 0;
    line-height: 1;
  }

  & p {
    margin-top: 0.35em;
  }

  @media ${devices.tabletLandscape} {
    min-height: 18em;
  }

  @media ${devices.tabletPortrait} {
    width: 22em;
    min-height: 22em;
  }

  @media ${devices.mobile} {
    width: 18em;
  }
`

const LineContainer = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;

  @media ${devices.mobile} {
    align-items: center;

    & h1 {
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
  position: absolute;
  bottom: 0;

  & h3, p {
    margin-bottom: 0;
  }
`

const LinksContainer = styled.div`
  display: flex;
  
  & a {
    margin-right: 3em;
  }
`

export default function Home({ homepage }) {

  const extLinkResolverHome = (doc) => {
    if (doc.link_type === "Document") {
      if (doc.slug == "work-page") {
        return "/"
      } else {
        return `/${doc.slug}`
      }
    } else if (doc.link_type === "Web" || doc.link_type === "Media") {
      return doc.url;
    } else {
      return "/"
    }
  }

  const data = homepage.data;
  const titleSplit = data.title[0].text.split(" ");

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Magdalena Navracruz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BlockContainer />
      <PageContainer>
        <TextContainer>
          <ColumnContainer>
            <LineContainer>
              <h1>{titleSplit[0]}</h1>
              <SprinklesContainer>
                <Square fill={colors.accentSparkle} />
                <Circle fill={colors.accentText} />
              </SprinklesContainer>
            </LineContainer>
            <LineContainer>
              <SprinklesContainer>
                <Sprinkle />
              </SprinklesContainer>
              <h1>{titleSplit[1]}</h1>
            </LineContainer>
            <ColumnFooter>
              <h3>{data.subtitle[0].text}</h3>
            </ColumnFooter>
          </ColumnContainer>
          <ColumnContainer>
            {RichText.render(data.description, extLinkResolverHome)}

            {data.show_callout && 
              <CalloutContainer>
                <Swoop />
                {RichText.render(data.callout, extLinkResolverHome)}
              </CalloutContainer>
            }
            <ColumnFooter>
              <LinksContainer>
                {data.links.map((l, i) => {
                  return (
                      <ArrowLink link={l.link} label={l.link_label} newTab={l.link.target || l.link_label == "resume"} key={i} large />
                    )
                })}
              </LinksContainer>
            </ColumnFooter>
          </ColumnContainer>
        </TextContainer>

        
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