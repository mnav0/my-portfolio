import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { colors } from "../styles/colors";
import { devices } from "../styles/devices";
import { MARGIN_X, MARGIN_Y_LG, MARGIN_Y_SM } from "../styles/layout";
import Button from "./button";

const DOT = 12;
const END_DOT = 2;

const Frame = styled.div`
  display: flex;
  box-sizing: border-box;
  width: 100%;
  height: 100dvh;
  border: 1px solid ${colors.action};

  @media ${devices.tabletPortrait} {
    flex-direction: column;
    height: auto;
    padding: 0 ${MARGIN_X}%;
  }
`

const Column = styled.aside`
  flex: 0 0 calc(${MARGIN_X}vw + 25em);
  width: calc(${MARGIN_X}vw + 25em);
  height: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: ${colors.action} transparent;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.action};
  }

  @media ${devices.tabletLandscape} {
    flex-basis: calc(${MARGIN_X}vw + 22em);
    width: calc(${MARGIN_X}vw + 22em);
  }

  @media ${devices.tabletPortrait} {
    flex-basis: auto;
    width: 100%;
    height: auto;
    overflow: visible;
  }
`

const ColumnInner = styled.div`
  position: relative;
  box-sizing: border-box;
  min-height: 100%;
  padding: ${MARGIN_Y_SM} 0 ${MARGIN_Y_SM} ${MARGIN_X}vw;

  @media ${devices.tabletPortrait} {
    padding: ${MARGIN_Y_SM} 0 ${MARGIN_Y_LG};
  }
`

const Connectors = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
`

const Group = styled.div`
  margin-top: ${MARGIN_Y_SM};
`

const Tag = styled.a`
  display: inline-block;
  margin: 0 0 0.35em;
  cursor: pointer;
`

const TagLabel = styled.span`
  display: inline-block;
  margin: 0 0 0.35em;
`

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const Dot = ({ active, ...props }) => <span {...props}></span>

const ProjectDot = styled(Dot)`
  position: absolute;
  left: ${-DOT * 2}px;
  top: 50%;
  width: ${DOT}px;
  height: ${DOT}px;
  margin-top: ${-DOT / 2}px;
  border-radius: 50%;
  background: ${colors.action};
  pointer-events: none;
  opacity: ${(props) => props.active ? 1 : 0};

  @media ${devices.tabletPortrait} {
    left: ${-DOT * 1.5}px;
  }
`

const Item = styled.li`
  position: relative;
  margin: 0 0 0.25em;

  &:hover ${ProjectDot} {
    opacity: 1;
  }
`

const ProjectTitle = styled.button`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0;
  border: none;
  background: transparent;
  text-align: left;
  cursor: pointer;
  appearance: none;
`

const ProjectLink = styled(Link)`
  display: block;
  width: 100%;
  text-align: left;
`

const Preview = styled.div`
  flex: 1;
  min-width: 0;
  min-height: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  border-left: 1px solid ${colors.action};

  @media ${devices.tabletPortrait} {
    display: none;
  }
`

const Hero = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  border-bottom: 1px solid ${colors.action};
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`

const Footer = styled.div`
  flex: 0 0 auto;
  display: flex;
  align-items: stretch;

  @media ${devices.tabletLandscape} {
    flex-direction: column;
  }
`

const Description = styled.div`
  flex: 1;
  min-width: 0;
  padding: 1em 1.5em;
  align-items: center;
  border-right: 1px solid ${colors.action};

  & p {
    margin: 0;
  }

  @media ${devices.tabletLandscape} {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid ${colors.action};
  }
`

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  min-width: 14em;

  & > * {
    flex: 1;
    width: 100%;
    white-space: nowrap;
    border-radius: 0;
    justify-content: center;
  }

  & > *:first-child {
    border: none;
    border-bottom: 1px solid ${colors.action};
  }

  & > *:last-child {
    border: none;
  }

  @media ${devices.tabletLandscape} {
    flex-direction: row;
    width: 100%;
    min-width: 0;

    & > *:first-child {
      border-bottom: none;
      border-right: 1px solid ${colors.action};
    }
  }
`

export default function WorkExplorer({ projects = [] }) {
  const [selected, setSelected] = useState(0);
  const [hovered, setHovered] = useState(null);
  const [lines, setLines] = useState([]);
  const [listMode, setListMode] = useState(false);

  const columnRef = useRef(null);
  const activeRef = useRef(null);
  const tagRefs = useRef({});

  const byTag = {};
  projects.forEach((project) => {
    const tag = project.tags && project.tags[0];
    if (!tag) return;
    if (!byTag[tag]) byTag[tag] = [];
    byTag[tag].push(project);
  });
  Object.keys(byTag).forEach((tag) => {
    byTag[tag].sort((a, b) => (a.data.order || 0) - (b.data.order || 0));
  });
  const tags = Object.keys(byTag).sort((a, b) => {
    if (a.toLowerCase() === "featured") return -1;
    if (b.toLowerCase() === "featured") return 1;
    return a.localeCompare(b);
  });
  const flat = [];
  tags.forEach((tag) => {
    byTag[tag].forEach((project) => flat.push(project));
  });

  useEffect(() => {
    const media = window.matchMedia(devices.tabletPortrait);
    const update = () => setListMode(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const selectedIndex = flat.length ? Math.min(selected, flat.length - 1) : 0;
  const selectedProject = flat[selectedIndex];
  const activeIndex = listMode ? hovered : selectedIndex;
  const activeProject = activeIndex != null ? flat[activeIndex] : null;

  useLayoutEffect(() => {
    const updateLines = () => {
      const column = columnRef.current;
      const activeEl = activeRef.current;
      if (!column || !activeEl || !activeProject) {
        setLines([]);
        return;
      }

      const gap = listMode ? DOT / 2 : DOT;
      const columnBox = column.getBoundingClientRect();
      const activeBox = activeEl.getBoundingClientRect();
      const x = activeBox.left - columnBox.left - gap - DOT / 2;
      const y = activeBox.top - columnBox.top + activeBox.height / 2;
      const next = [];

      (activeProject.tags || []).slice(1).forEach((tag) => {
        const tagEl = tagRefs.current[tag];
        if (!tagEl) return;
        const tagBox = tagEl.getBoundingClientRect();
        const endY = tagBox.top - columnBox.top + tagBox.height / 2;
        next.push({ x, y, endY });
      });

      setLines(next);
    };

    updateLines();
    const column = columnRef.current;
    if (!column) return;

    const observer = new ResizeObserver(updateLines);
    observer.observe(column);
    window.addEventListener("resize", updateLines);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLines);
    };
  }, [activeProject, activeIndex, listMode]);

  if (!flat.length || !selectedProject) return null;

  const { data } = selectedProject;

  return (
    <Frame>
      <Column>
        <ColumnInner ref={columnRef}>
          <Connectors>
            {lines.map((line, i) => (
              <line key={i} x1={line.x} y1={line.y} x2={line.x} y2={line.endY} stroke={colors.action} strokeWidth="1" />
            ))}
            {lines.map((line, i) => (
              <circle key={i} cx={line.x} cy={line.endY} r={END_DOT} stroke={colors.action} fill={colors.primaryLight} />
            ))}
          </Connectors>

          {tags.map((tag) => (
            <Group key={tag}>
              {listMode ? (
                <TagLabel
                  className="link"
                  ref={(node) => {
                    if (node) tagRefs.current[tag] = node;
                    else delete tagRefs.current[tag];
                  }}
                >
                  {tag}
                </TagLabel>
              ) : (
                <Tag
                  ref={(node) => {
                    if (node) tagRefs.current[tag] = node;
                    else delete tagRefs.current[tag];
                  }}
                  onClick={() => {
                    const index = flat.indexOf(byTag[tag][0]);
                    if (index >= 0) setSelected(index);
                  }}
                >
                  {tag}
                </Tag>
              )}
              <List>
                {byTag[tag].map((project) => {
                  const index = flat.indexOf(project);
                  const active = activeIndex === index;
                  const title = project.data.title1?.[0]?.text || project.uid;

                  return (
                    <Item
                      key={project.uid}
                      ref={active ? activeRef : null}
                      onMouseEnter={listMode ? () => setHovered(index) : undefined}
                      onMouseLeave={listMode ? () => setHovered(null) : undefined}
                    >
                      <ProjectDot active={active} />
                      {listMode ? (
                        <ProjectLink className="plain" href={`/projects/${project.uid}`}>
                          {title}
                        </ProjectLink>
                      ) : (
                        <ProjectTitle
                          type="button"
                          className={active ? "heavy" : undefined}
                          onClick={() => setSelected(index)}
                        >
                          {title}
                        </ProjectTitle>
                      )}
                    </Item>
                  );
                })}
              </List>
            </Group>
          ))}
        </ColumnInner>
      </Column>

      <Preview>
        <Hero>
          {data.hero?.url && (
            <PrismicNextImage field={data.hero} fill sizes="70vw" fallbackAlt="" style={{ objectFit: "cover" }} />
          )}
        </Hero>
        <Footer>
          <Description>
            {Array.isArray(data.description) ? (
              <PrismicRichText field={data.description} />
            ) : data.description ? (
              <p>{data.description}</p>
            ) : null}
          </Description>
          <Actions>
            <Button variant="outline" onClick={() => setSelected((i) => (i + 1) % flat.length)}>
              Next project
            </Button>
            <Button variant="solid" href={`/projects/${selectedProject.uid}`}>
              Learn more
            </Button>
          </Actions>
        </Footer>
      </Preview>
    </Frame>
  )
}
