import GlobalStyle from "../../styles/globalStyles";
import { client } from '../../prismicConfiguration'
import * as Prismic from '@prismicio/client'
import ArrowLink from "../../components/arrowLink";
import styled from "styled-components";
import Circle from "../../assets/Circle"
import Square from "../../assets/Square.js"
import { colors } from "../../styles/colors"
import { devices } from "../../styles/devices"
import Head from "next/head"
import Link from "next/link"
import Header from "../../components/header"

const SmallCircle = styled.div`
  margin-right: 0.25em;
`

const SmallSquare = styled.div`
  margin-right: 0.25em;
`

const Title = styled.h1`
  width: 57.5%;
  background-color: ${colors.cream};
  margin-bottom: 0.25em;

  @media ${devices.tabletPortrait} {
    width: 100%;
  }
`

const Overview = styled.div`
  & > p {
    width: 57.5%;
    padding: 0;
    margin: 0;
    background-color: ${colors.cream};
  }

  @media ${devices.tabletPortrait} {
    & > p {
      width: 100%;
      padding-bottom: 1em;
    }
  }
`

const Categories = styled.div`
  position: absolute;
  right: 0;
  top: 0;

  @media ${devices.tabletPortrait} {
    left: 0;
    top: 18em;
  }
`

const RightContentContainer = styled.div`
  position: relative;
  top: -3.2rem;
  z-index: -1;
`

const Line = styled.div`
  height: 1px;
  background-color: ${colors.darkBlue};

  @media ${devices.tabletPortrait} {
    height: 15em;
    position absolute;
    top: 3.2rem;
    width: 1px;
  }
`

const Date = styled.div`
  display: inline-flex;
  align-items: flex-start;
  position: absolute;
  top: -1.75em;
  right: 0;

  & > p {
    padding: 0;
    margin: -0.1em 0 0 0.5em;
  }

  @media ${devices.tabletPortrait} {
    left: 1em;
  }
`

const Tags = styled.div`
  background-color: ${(props) => props.color};
  padding: 1em;
  width: 15em;
  border: 1px solid ${colors.darkBlue};
  position: relative;

  & > p {
    color: ${(props) => props.darkBackground == true ? colors.cream : colors.darkBlue};
    text-transform: uppercase;
    margin: 0;
    padding: 0.1em;
  }
`

const ProjectDetailsContainer = styled.div`
  position: relative;
  top: 12em;
  padding-bottom: 2em;

  @media ${devices.tabletPortrait} {
    top: 20em;
  }
`

export default function Project({ project }) {
  const data = project.data

  const getType = ( types ) => {
    let parsedTypes = []

    types.forEach((type) => {
        parsedTypes.push(type.type)
    })

    return parsedTypes;
  }

  const types = getType(data.project_types)

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>{data.title[0].text} - magdalena navracruz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <ArrowLink url="/work" label="back to work" back={true} />
      <Overview>
        <Title>{data.title[0].text}</Title>
        <RightContentContainer>
          <Line />
          <Categories>
            <Date>
              {types.includes('designer') && 
                <SmallCircle>
                  <Circle size={12} />
                </SmallCircle>
              }
              {types.includes('developer') && 
                <SmallSquare>
                  <Square size={12} />
                </SmallSquare>
              }
              <p>{data.dates[0].text}</p>
            </Date>
            <Tags color={data.main_color} darkBackground={data.color_type == "dark"}>
              {data.tags.map((tag, i) => {
                return <p key={i}>{tag.tag[0].text}</p>
              })}
            </Tags>
          </Categories>
        </ RightContentContainer>
        <p>{data.extended_description[0].text}</p>
      </Overview>
      <ProjectDetailsContainer>
        <p>MORE INFO COMING SOON - in the meantime,
        {data.finished_project_link.url &&
          <>
            <Link href={data.finished_project_link.url}> view the final website</Link>
            <>&nbsp;or</>
          </>
        }
        <Link href="mailto:mnavracruz@gmail.com"> contact me to hear more!</Link>
        </p>
      </ProjectDetailsContainer>
    </>
  )
}

export async function getStaticPaths() {
  const {results} = await client.query(
    Prismic.Predicates.at('document.type', 'project')
  )

  const paths = results.map((project) => {
    return {
      params: {
        uid: project.uid,
      },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const uid = params.uid
  const project = await client.getByUID("project", uid)

  return {
    props: {
      project
    },
  }
}
