import { client } from "../../prismic";
import React from "react";
import GlobalHeader from "../../components/globalHeader";
import Navigation from "../../components/navigation";
import FullPageHeading from "../../components/fullPageHeading";
import styled from "styled-components";
import { colors } from "../../styles/colors";
import { devices } from "../../styles/devices";
import Square from "../../components/decorations/Square";
import Circle from "../../components/decorations/Circle";
import Sprinkle from "../../components/decorations/Sprinkle";
import { PrismicRichText } from "@prismicio/react";
import { Link } from 'react-scroll';

const TwoColumns = styled.div`
  margin: 0;
  display: flex;
  justify-content: space-between;
  position: relative;

  @media ${devices.tabletPortrait} {
    flex-direction: column;
  }
`

const RightColumn = styled.div`
  position: relative;
  width: 50%;
  padding-left: 1em;

  & img {
    width: 100%;
    height: auto;
  }

  @media ${devices.tabletPortrait} {
    width: 100%;
    padding-left: 0;
    top: 6em;
  }
`

const StickyMenu = styled.ul`
  position: sticky;
  width: 25em;
  height: 25em;
  list-style: none;
  padding: 0;
  top: 3.5em;
  margin-top: 1.25em;

  @media ${devices.tabletPortrait} {
    height: auto;
    width: 100%;
    z-index: 100;
    margin: 0;
    padding: 1em 0 0;
    top: 0;
    background: ${colors.primaryLight};
    border-bottom: 1px solid ${colors.callout};

    & li {
      display: inline-block;
      margin: 0 2em 0.5em 0;
    }
  }
`

const Divider = styled.div`
  padding: 0 0 4em;
  margin-bottom: 2em;
`

export const NavLinks = styled(Link).attrs(() => ({
  activeClass: 'active',
}))`
  font-family: BentogaItalic-Thin;
  text-transform: uppercase;
  font-weight: 400;
  color: ${colors.primaryDark};
  font-size: 1.25em;
  transition: all 0.1s ease-in;
  cursor: pointer;

  & svg {
    display: none;
    margin: 0 0 0.1em 0.1em;
    vertical-align: middle;
  }

  &:hover {
    text-decoration: none;

    & svg {
      display: inline-block;
    }
  }

  &.active {
    font-size: 3.75em;

    & svg {
      display: inline-block;
    }

    @media ${devices.tabletPortrait} {
      font-size: 1.25em
    }
  }


`;

export default function Project({ project }) {
  const { data } = project;

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
      {data.sections?.length > 0 ?
        <TwoColumns>
          <StickyMenu>
            {data.sections?.map((section, index) => {
              return (
                <li key={index}>
                  <NavLinks smooth spy to={`section-${index}`} offset={-100}>
                    {section.section_title[0]?.text}
                    <React.Fragment>
                      {decorations[index]}
                    </React.Fragment>
                  </NavLinks>
                </li>
              )
            })}
          </StickyMenu>
          <RightColumn>
            {data.sections?.map((section, index) =>
              <Divider id={`section-${index}`} key={index}>
                <PrismicRichText field={section?.text} />
              </Divider>
            )}
          </RightColumn>
        </TwoColumns>
      :
        <>
          <p>MORE COMING SOON!</p>
          <a href="/work">Back to Work</a>
        </>
      }
    </>
  )
}

export async function getStaticPaths() {
  const projects = await client.getAllByType("project");

  // prerender all pages for faster initial page load
  const paths = projects.map((project) => ({
    params: { uid: project.uid },
  }))

  return { paths, fallback: false };
}

export async function getStaticProps(context) {
  const project = await client.getByUID("project", context.params.uid);

  return {
    props: { project },
  }
}
