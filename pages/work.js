import { useState } from "react"
import GlobalStyle from "../styles/globalStyles";
import styled from "styled-components"
import { client } from "../prismicConfiguration";
import Head from "next/head"
import Marquee from "react-fast-marquee";
import Link from "next/link"
import { devices } from "../styles/devices"
import Header from "../components/header"

const Projects = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-top: 2rem;
`

const ProjectContainer = styled.div`
  width: 49%;
  padding: 2rem 3rem;
  border: 1px solid ${(props) => props.color};
  margin-bottom: 1.2rem;
  cursor: pointer;
  ${(props) => props.hovered && `box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.25)`};
  transition: all 0.5s ease-in-out;

  @media ${devices.tabletPortrait} {
    width: 100%;
  }
`

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: nowrap;
  overflow: visible;
`

const Tag = styled.div`
  display: flex;

  & > p {
    text-transform: uppercase;
    margin-right: 1em;
  }
`

export default function Work({ workPage }) {
  const [ hover, setHover ] = useState(-1)
  const title = workPage.data.title[0].text
  const projects = workPage.data.projects

  return (
    <>
      <GlobalStyle />
      <Head>
        <title>{title} - magdalena navracruz</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <Projects>
        {projects.map((project, i) => {
          const tags = project.displayed_project.data.tags
          return (
            <Link href={project.displayed_project.url} key={i}>
              <ProjectContainer color={project.displayed_project.data.main_color} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)}
                hovered={hover == i}>
                <TagsContainer>
                  <Marquee gradient={false} play={hover == i}>
                    {tags.map((tag, tagIndex) => {
                      return <Tag key={tagIndex}>
                        <p>{tag.tag[0].text}</p>
                        {tagIndex < tags.length - 1 && <p> - </p>}
                      </Tag>
                    })}
                  </Marquee>
                </TagsContainer>
                <h2>{project.displayed_project.data.title[0].text}</h2>
                <p>{project.displayed_project.data.description[0].text}</p>
              </ProjectContainer>
            </Link>
          )
        })}
      </Projects>
    </>
  )
}

export async function getStaticProps() {
  const res = await client.query('');
  const workPage = await client.getByUID('page', 'work_page', {
    fetchLinks: ['project.title', 'project.description', 'project.tags', 'project.main_color']
  })

  return {
    props: {
      workPage
    },
  };
}