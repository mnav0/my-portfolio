import { client } from "../prismicConfiguration";
import { RichText } from "prismic-reactjs";
import styled from "styled-components"
import GlobalStyle from "../styles/globalStyles";
import { colors } from "../styles/colors"
import { devices } from "../styles/devices"
import Head from "next/head";
import ArrowLink from "../components/arrowLink";

const PageContainer = styled.div`
  margin-top: 20em;

  @media ${devices.tabletLandscape} {
    margin-top: 15em;
  }
`

const TextContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media ${devices.tabletLandscape} {
    flex-direction: column;
  }
`

const ColumnContainer = styled.div`
  width: 33%;
  min-width: 25em;
  position: relative;
  height: 20em;

  & h1 {
    margin-top: 0;
  }

  & p {
    margin-top: 0.35em;
  }

  @media ${devices.tabletLandscape} {
    height: 15em;
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

const BlockContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 20em;
  background-color: ${colors.action};

  @media ${devices.tabletLandscape} {
    height: 15em;
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

  const data = homepage.data

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Maggie Navracruz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <BlockContainer />
      <PageContainer>
        <TextContainer>
          <ColumnContainer>
            <h1>{data.title[0].text}</h1>
            <ColumnFooter>
              <h3>{data.subtitle[0].text}</h3>
            </ColumnFooter>
          </ColumnContainer>
          <ColumnContainer>
            {RichText.render(data.description, extLinkResolverHome)}
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