import { client } from "../../prismic";
import { createGlobalStyle } from "styled-components";
import GlobalHeader from "../../components/globalHeader";
import ProjectIntro from "../../components/projectIntro";
import CaseStudy from "../../components/caseStudy";

const SnapScroll = createGlobalStyle`
  html {
    scroll-snap-type: y mandatory;
  }
`

export default function Project({ project }) {
  const { data } = project;
  const hasCaseStudy = data.case_study && data.sections?.length > 0;

  return (
    <>
      <GlobalHeader />
      {hasCaseStudy && <SnapScroll />}
      <ProjectIntro data={data} tags={project.tags} />
      {hasCaseStudy && <CaseStudy data={data} />}
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
