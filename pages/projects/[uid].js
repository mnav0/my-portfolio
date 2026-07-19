import { client } from "../../prismic";
import { createGlobalStyle } from "styled-components";
import GlobalHeader from "../../components/globalHeader";
import ProjectIntro from "../../components/projectIntro";
import CaseStudy from "../../components/caseStudy";
import { getNextProject } from "../../lib/projectOrder";

const SnapScroll = createGlobalStyle`
  html {
    scroll-snap-type: y mandatory;
  }
`

const ProjectPageStyles = createGlobalStyle`
  body {
    padding-bottom: 0 !important;
  }
`

export default function Project({ project, nextProject }) {
  const { data } = project;
  const hasCaseStudy = data.case_study && data.sections?.length > 0;

  return (
    <>
      <GlobalHeader />
      <ProjectPageStyles />
      <SnapScroll />
      <ProjectIntro data={data} tags={project.tags} />
      <CaseStudy data={data} nextProject={nextProject} preview={!hasCaseStudy} />
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
  const [project, projects] = await Promise.all([
    client.getByUID("project", context.params.uid),
    client.getAllByType("project"),
  ]);
  const nextProject = getNextProject(projects, context.params.uid);

  return {
    props: { project, nextProject },
  }
}
