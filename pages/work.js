import { client } from "../prismic";
import styled from "styled-components";
import GlobalHeader from "../components/globalHeader";
import { PrismicRichText } from "@prismicio/react";
import { useState, useEffect } from "react";
import { devices } from "../styles/devices";
import { colors } from "../styles/colors";
import Link from "next/link";
import Navigation from "../components/navigation";

const GRID_COLUMNS = [
  [12],
  [7, 5],
  [6, 6, 12],
  [5, 7, 7, 5],
  [5, 7, 12, 12, 12],
  [5, 7, 12, 4, 4, 4]
]

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  padding: 2em 0 0;
`

const Item = ({ selected, ...props}) => <li {...props}></li>

const ListItem = styled(Item)`
  cursor: pointer;
  margin: 0 2em 1em 0;
  text-decoration: ${(props) => props.selected ? `underline ${colors.action}` : 'none'}
`

const Projects = styled.div`
  display: inline-grid;
  gap: 1em;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(3, auto);
  width: 100%;
  padding-bottom: 1em;
`

const Project = ({ color, hovered, span, ...props}) => <div {...props}></div>

const ProjectContainer = styled(Project)`
  padding: 3em;
  border: 1px solid ${(props) => props.color};
  cursor: pointer;
  box-shadow: ${(props) => props.hovered ? "2px 4px 8px 0px rgba(0, 0, 0, 0.25)" : "none"};
  transition: all 0.3s ease-in-out;
  min-height: 5rem;
  grid-column-end: ${props => `span ${props.span || 6}`};
  display: flex;
  align-items: center;
  position: relative;

  & p {
    margin: 0;
  }

  & a {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;;
  }

  @media ${devices.tabletLandscape} {
    padding: 2em;
  }

  @media screen and ${devices.tabletLandscape} { 
    grid-column-end: span 12;
  }
`

export default function Work({ tags, projects }) {
  const [ hover, setHover ] = useState(-1);
  const [ selectedTag, setSelectedTag ] = useState(0);
  const [ selectedProjects, setSelectedProjects ] = useState([]);

  useEffect(() => {
    let filteredProjects = projects;
    if (selectedTag > 0) {
      filteredProjects = projects.filter((project) => project.tags.includes(tags[selectedTag]));
    }
    setSelectedProjects(filteredProjects);
  }, [selectedTag]);

  return (
    <>
      <GlobalHeader />
      <Navigation selectedRoute={"work"} />
      <List>
        {tags.map((tag, index) => {
          return (
            <ListItem key={index} selected={selectedTag === index}>
              <a onClick={() => setSelectedTag(index)}>{tag}</a>
            </ListItem>
          )
        })}
      </List>
      <Projects>
        {selectedProjects.map((project, index) => {
          const { data } = project;

          const link = `/projects/${project.uid}`;
          return (
            <ProjectContainer 
              key={index}
              onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(-1)}
              span={GRID_COLUMNS[selectedProjects.length - 1][index]}
              color={data.main_color}
              hovered={hover === index}>
                <PrismicRichText field={data.title} />
                <Link href={link} />
            </ProjectContainer>
          )
        })}
      </Projects>
    
    </>
  )
}

export async function getStaticProps() {
  const projects = await client.getAllByType("project", {
    orderings: { field: "document.first_publication_date" }
  });

  const tags = [ "All" ];
  projects.forEach((project) => {
    const newTags = project.tags;
    newTags.forEach((tag) => {
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    })
  })

  return {
    props: {
      projects,
      tags
    },
  };
}
