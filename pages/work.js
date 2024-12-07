import { client } from "../prismic";
import styled from "styled-components";
import GlobalHeader from "../components/globalHeader";
import { PrismicRichText } from "@prismicio/react";
import { useState } from "react";
import { devices } from "../styles/devices";

const GRID_COLUMNS = [
  5, 7, 12, 4, 4, 4
]

const GRID_COLUMNS_TABLET = [
  5, 7, 12, 12, 7, 5
]

const Projects = styled.div`
  display: inline-grid;
  gap: 1em;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, auto);
  height: 30em;

  @media ${devices.laptop} {
    height: 40em;
  }

  @media ${devices.tabletLandscape} {
    height: 50em;
  }

  @media ${devices.tablet} {
    height: 75em;
  }

  @media ${devices.mobile} {
    height: 60em;
  }
`

const ProjectContainer = styled.div`
  padding: 0 3em;
  border: 1px solid ${(props) => props.color};
  cursor: pointer;
  ${(props) => props.hovered && `box-shadow: 2px 4px 8px 0px rgba(0, 0, 0, 0.25)`};
  transition: all 0.3s ease-in-out;
  min-height: 10em;
  grid-column-end: ${props => `span ${GRID_COLUMNS[props.index]}`};
  display: flex;
  align-items: center;

  & p {
    margin: 0;
  }

  @media ${devices.tabletLandscape} { 
    grid-column-end: ${props => `span ${GRID_COLUMNS_TABLET[props.index]}`};
  }

  @media ${devices.tablet} { 
    grid-column-end: span 12;
  }

  @media ${devices.mobile} {
    padding: 0 2em;
  }
`

export default function Work({ projects }) {
  const [ hover, setHover ] = useState(-1);
  console.log(projects)
  if (projects) {
    return (
      <>
        <GlobalHeader />
        <Projects>
          {projects.map((project, index) => {
            const { data } = project;
            return (
              <ProjectContainer 
                key={index}
                onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(-1)}
                index={index}
                color={data.main_color}
                hovered={hover === index}>
                <PrismicRichText field={data.title} />
              </ProjectContainer>
            )
          })}
        </Projects>
      
      </>
    )
  }
}

export async function getStaticProps() {
  const projects = await client.getAllByType("project", {
    orderings: { field: "document.first_publication_date" }
  });

  return {
    props: {
      projects
    },
  };
}
