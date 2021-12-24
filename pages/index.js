import { Client } from "../prismicConfiguration";
import { RichText } from "prismic-reactjs";
import Link from "next/link"
import styled from "styled-components"
import GlobalStyle from "../styles/globalStyles";
import { colors } from "../styles/colors"
import { devices } from "../styles/devices"
import Arrow from "../assets/arrow.svg"
import Sparkle from "../assets/sun-rays.svg"
import Img from "next/image";
import Head from "next/head";

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
    border-bottom: 2px solid ${colors.blue};
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
  width: 8.2em;

  @media ${devices.laptop} {
    width: 4.5em;
  }

  @media ${devices.tabletPortrait} {
    width: 3.6em;
  }
`

const SparkleContainer = styled.div`
  position: relative;
  top: -2rem;
  left: -2rem;

  @media ${devices.laptop} {
    top: 3.8rem;
    left: -3.5rem;
  }

  @media ${devices.tabletPortrait} {
    width: 4rem;
    height: auto;
    left: 2rem;
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

const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 1em;

  & p {
    margin: 0 1em 0 0;
    font-size: 1.5em;
  }
  & a {
    margin-right: 1em;
    cursor: pointer;
    font-size: 1.5em;
  }

  & a:hover {
    margin-right: 1.5em;
    transition: margin-right 0.1s ease-in-out;
  }

  @media ${devices.tabletPortrait} {
    & p {
      font-size: 1em;
    }
    & a {
      font-size: 1em;
      margin-right: 0.5em;
    }
    & a:hover {
      margin-right: 0.75em;
    }
  }
`

const ArrowContainer = styled.div`
  width: 2.25em;
  height: 0.75em;
  margin-right: 3em;
  margin-top: 0.4em;

  @media ${devices.tabletPortrait} {
    margin-top: 0.1em;
    margin-right: 1.5em;
  }
`

const ShapesContainer = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
`

const PinkRectangle = styled.div`
  position: absolute;
  top: 6.5em;
  left: calc(13% - 12.5em);
  height: 12em;
  width: 21em;
  background-color: ${colors.pink};
`

const YellowSquare = styled.div`
  position: absolute;
  height: 12.25em;
  width: 12.25em;
  left: 13%;
  top: 3.9em;
  background-color ${colors.yellow};
`

const GreenRectangle = styled.div`
  position: absolute;
  width: 10.5em;
  height: 18.375em;
  left: calc(13% + 1.75em);
  top: 0.15em;
  border: 2px solid ${colors.green};
`

export default function Home({ homepage }) {

  const extLinkResolverHome = (doc) => {
    if (doc.link_type === "Document") {
      if (doc.slug == "work-page") {
        return "/"
      } else {
        return `/${doc.slug}`
      }
    } else if (doc.link_type === "Web") {
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
        <YellowSquare />
        <PinkRectangle />
        <GreenRectangle />
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
            const inactive = l.link_label == "view my work"
            return (
              <LinkContainer key={i}>
                <Link href={extLinkResolverHome(l.link)}
                >
                  {!inactive ? 
                    <a target={l.link.target || l.link_label == "resume" ? "_blank" : ""}>{l.link_label}</a>
                    :
                    <p>come back to view my work soon!</p>
                  }
                </Link>
                {!inactive && 
                  <ArrowContainer>
                    <Img src={Arrow} />
                  </ArrowContainer>
                }
              </LinkContainer>
            )
          })}
        </LinksContainer>
      </PageContainer>
    </>
  )
}

export async function getStaticProps() {
  const homepage = await Client.getSingle("homepage");

  return {
    props: {
      homepage
    },
  };
}