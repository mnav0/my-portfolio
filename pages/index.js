import { client } from "../prismicConfiguration";
import { RichText } from "prismic-reactjs";
import styled from "styled-components"
import GlobalStyle from "../styles/globalStyles";
import { colors } from "../styles/colors"
import { devices } from "../styles/devices"
import Sparkle from "../assets/sun-rays.svg"
import Sprinkle from "../assets/Sprinkle.js"
import Circle from "../assets/Circle"
import Square from "../assets/Square.js"
import Img from "next/image";
import Head from "next/head";
import ArrowLink from "../components/arrowLink";

const PageContainer = styled.div`
  position: absolute;
  top: 10em;
  left: 13%; 
  width: 87%;
`

const TextContainer = styled.div`
  & a {
    position: relative;
    bottom: 0;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-bottom: 2px solid ${colors.red};
  }

  & a:hover {
    bottom: 2px;
    transition: bottom 0.1s ease-in-out;
  }

  & p {
    font-size: 1.5em;
    width: 59%;
  }

  @media ${devices.laptop} {
    & p {
      width: 85%;
    }
  }

  @media ${devices.tabletPortrait} {
    & p {
      font-size: 1em;
    }
  }
`

const TitleContainer = styled.div`
  display: flex;
  width: 89%;
`

const Title = styled.h1`
  margin-top: 0;
  width: 6.6em;

  @media ${devices.laptop} {
    width: 4.2em;
  }

  @media ${devices.tabletPortrait} {
    width: 3.4em;
  }
`

const SparkleContainer = styled.div`
  position: relative;
  top: -2em;
  left: -2em;

  @media ${devices.laptop} {
    top: 4em;
    left: -3.5em;
  }

  @media ${devices.tabletPortrait} {
    width: 4em;
    height: auto;
    left: 0;
    top: 3em;
  }

  @media ${devices.mobile} {
    top: 2.4em;
    left: 0.2em;
  }
`

const LinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 59%;
  padding-bottom: 3em;

  @media ${devices.laptop} {
    width: 85%;
  }
`

const ShapesContainer = styled.div`
  position: relative;
  left: -5.5%;
  width: 13%;
  top: 7.3rem;

  @media ${devices.laptop} {
    top: 0.5em;
    width: 89%;
    left: 5.5%;
  }
`

const YellowSquare = styled.div`
  position: absolute;
  right: 0;
  z-index: 1;

  @media ${devices.laptop} {
    left: 2.5rem;
  }
`

const PurpleCircle = styled.div`
  position: absolute;
  z-index: 2;
  right: 1.5rem;
  top: 0.5rem;

  @media ${devices.laptop} {
    left: 1rem;
  }
`

const RedSprinkle = styled.div`
  position: absolute;
  right: 2.5rem;
  top: -1.9rem;
  z-index: 3;

  @media ${devices.laptop} {
    left: 0;
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
        <title>magdalena navracruz - home</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ShapesContainer>
        <RedSprinkle>
          <Sprinkle />
        </RedSprinkle>
        <PurpleCircle>
          <Circle />
        </PurpleCircle>
        <YellowSquare>
          <Square />
        </YellowSquare>
      </ShapesContainer>
      <PageContainer>
        <TextContainer>
          <TitleContainer>
            <Title>{data.title[0].text}</Title>
            <SparkleContainer>
              <Img src={Sparkle} />
            </SparkleContainer>
          </TitleContainer>
          {RichText.render(data.description, extLinkResolverHome)}
        </TextContainer>

        <LinksContainer>
          {data.links.map((l, i) => {
            return (
                <ArrowLink link={l.link} label={l.link_label} newTab={l.link.target || l.link_label == "resume"} key={i} large />
              )
          })}
        </LinksContainer>
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