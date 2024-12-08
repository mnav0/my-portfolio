import { client } from "../../prismic";
import GlobalHeader from "../../components/globalHeader";
import Link from "next/link";
import TwoColumnLayout from "../../components/twoColumnLayout";

export default function Project({ project }) {
  const { data } = project;

  return (
    <>
      <GlobalHeader />
      {data.display ?
        (data.sections.map((section, index) => {
          return (
            <TwoColumnLayout 
              key={index}
              heading={section.section_title[0].text} 
              description={section.text} 
            />
          )
        })) : (
          <>
            <Link href="/work">Back to work</Link>
            <h1>Coming Soon</h1>
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
  const project = await client.getSingle("project", context.uid);

  return {
    props: { project },
  }
}