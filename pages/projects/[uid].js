import { client } from "../../prismic";
import GlobalHeader from "../../components/globalHeader";
import Link from "next/link";
import TwoColumnLayout from "../../components/twoColumnLayout";
import Navigation from "../../components/navigation";
import FullPageHeading from "../../components/fullPageHeading";

export default function Project({ project }) {
  const { data } = project;

  return (
    <>
      <GlobalHeader />
      <Navigation darkMode />
      <FullPageHeading heading={data.title[0].text} subheading={data.tools[0]?.text} accentText={data.date} />
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
  console.log(context)
  const project = await client.getByUID("project", context.params.uid);

  return {
    props: { project },
  }
}