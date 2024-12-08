import { client } from "../prismic";
import styled from "styled-components";
import GlobalHeader from "../components/globalHeader";
import { PrismicRichText } from "@prismicio/react";
import { useState } from "react";
import { devices } from "../styles/devices";
import Link from "next/link";
import Navigation from "../components/navigation";

const GRID_COLUMNS = [
  5, 7, 12, 4, 4, 4
]

const Projects = styled.div`
  display: inline-grid;
  gap: 1em;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, auto);
  height: 40em;
  width: 100%;
  padding-bottom: 1em;

  @media screen and ${devices.laptop} { 
    height: 50em;
  }

  @media screen and ${devices.tabletPortrait} { 
    height: 90em;
  }

  @media screen and ${devices.mobile} {
    height: 50em;
  }
`

const Project = ({ color, hovered, span, ...props}) => <div {...props}></div>

const ProjectContainer = styled(Project)`
  padding: 0 3em;
  border: 1px solid ${(props) => props.color};
  cursor: pointer;
  box-shadow: ${(props) => props.hovered ? "2px 4px 8px 0px rgba(0, 0, 0, 0.25)" : "none"};
  transition: all 0.3s ease-in-out;
  min-height: 10em;
  grid-column-end: ${props => `span ${props.span || 6}`};
  display: flex;
  align-items: center;

  & p {
    margin: 0;
  }

  & a {
    text-transform: none;
  }

  & a:hover {
    text-decoration: none;
    text-transform: none;
  }

  @media ${devices.tabletLandscape} {
    padding: 0 2em;
  }

  @media screen and ${devices.tabletLandscape} { 
    grid-column-end: span 12;
  }
`

export default function Work({ projects }) {
  const [ hover, setHover ] = useState(-1);

  if (projects) {
    return (
      <>
        <GlobalHeader />
        <Navigation />
        <Projects>
          {projects.map((project, index) => {
            const { data } = project;

            const link = `/projects/${project.uid}`;
            return (
              <ProjectContainer 
                key={index}
                onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(-1)}
                span={GRID_COLUMNS[index]}
                color={data.main_color}
                hovered={hover === index}>
                <Link href={link}>
                  <PrismicRichText field={data.title} />
                </Link>
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
