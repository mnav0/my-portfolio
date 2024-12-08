import { client } from "../../prismic";
import GlobalHeader from "../../components/globalHeader";
import Link from "next/link";

export default function Project({ project }) {
  const { data } = project;

  return (
    <>
      <GlobalHeader />
      <Link href="/work">Back to work</Link>
      <h1>Coming Soon</h1>
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

export async function getStaticProps(pageContext) {
  const project = await client.getByUID("project", pageContext.params.uid);

  return {
    props: {
      project
    },
  };
}