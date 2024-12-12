import { client } from "../../prismic";
import React, { useState, useEffect, useRef } from "react";
import GlobalHeader from "../../components/globalHeader";
import Navigation from "../../components/navigation";
import FullPageHeading from "../../components/fullPageHeading";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { devices } from "../../styles/devices";
import Square from "../../components/decorations/Square";
import Circle from "../../components/decorations/Circle";
import Sprinkle from "../../components/decorations/Sprinkle";
import { RichText } from "prismic-reactjs";
import Link from "next/link";

const TwoColumns = styled.div`
  margin: 0;
  display: flex;
  justify-content: space-between;
  position: relative;
`

const RightColumn = styled.div`
  position: relative;
  width: 50%;

  & img {
    width: 100%;
    height: auto;
  }
`

const StickyMenu = styled.ul`
  position: sticky;
  width: 25em;
  height: 25em;
  list-style: none;
  padding: 0;
  top: 3.5em;
  margin-top: 3em;
`

const ListItem = ({ active, hover, ...props}) => <li {...props}></li>

const MenuItem = styled(ListItem)`
  font-family: BentogaItalic-Thin;
  text-transform: uppercase;
  font-weight: 400;
  color: ${colors.primaryDark};
  font-size: ${props => props.active ? "3.75em" : "1.25em"};
  transition: all 0.1s ease-in;
  cursor: pointer;

  & svg {
    margin: ${props => props.active ? "0 0 0 0.05em" : "0.05em 0 0 0.2em"};
    vertical-align: ${props => (props.hover && !props.active) ? "baseline" : "middle"};
  }

  @media ${devices.tabletPortrait} {
    font-size: ${props => props.active ? "3.25em" : "1.25em"};
  }

  @media ${devices.mobile} {
    font-size: ${props => props.active ? "2.5em" : "1.25em"};
  }
`

const Divider = styled.div`
  padding: 2em 0;
  margin: 0;
  min-height: 100vh;
`

export default function Project({ project }) {
  const [ selectedSection, setSelectedSection ] = useState(0);
  const [ hover, setHover ] = useState(-1);
  const ref = useRef(null);
  const { data } = project;

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedSection]);

 
  const decorations = [
    <Circle size={15} />,
    <Square size={15} />,
    <Sprinkle size="xsmall" />,
    <Circle size={15} />,
    <Square size={15} />,
    <Sprinkle size="xsmall" />
  ];

  return (
    <>
      <GlobalHeader />
      <Navigation darkMode />
      <FullPageHeading heading={data.title[0].text} subheading={data.tools[0]?.text} accentText={data.date} />
      {data.display ?
        <TwoColumns>
          <StickyMenu>
            {data.sections.map((section, index) => {
              const isActive = index === selectedSection;
              const isHover = index === hover;
              return (
                <MenuItem key={index} 
                  active={isActive}
                  hover={isHover}
                  onClick={() => setSelectedSection(index)}
                  onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(-1)}>
                  {section.section_title[0].text}
                  {(isActive || isHover) && 
                    <React.Fragment>
                      {decorations[index]}
                    </React.Fragment>
                  }
                </MenuItem>
              )
            })}
          </StickyMenu>
          <RightColumn>
            {data.sections.map((section, index) => 
              <Divider ref={selectedSection === index ? ref : null}>
                {RichText.render(section.text)}
              </Divider>
            )}
          </RightColumn>
        </TwoColumns>
        : (
          <>
            <p>MORE COMING SOON...</p>
            <Link href="/work">Back</Link>
          </>
        ) 
      }
    </>
  )
}

export async function getStaticPaths() {
  const projects = await client.getAllByType("project");
 
  // Get the paths we want to prerender based on posts
  // prerender all pages for faster initial page load
  const paths = projects.map((project) => ({
    params: { uid: project.uid },
  }))
 
  // { fallback: false } means other routes should 404
  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const project = await client.getByUID("project", context.params.uid);

  return {
    props: { project },
  }
}