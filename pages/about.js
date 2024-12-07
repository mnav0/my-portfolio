import { client } from "../prismic";
import { colors } from "../styles/colors";
import Square from "../components/decorations/Square";
import Circle from "../components/decorations/Circle";
import Sprinkle from "../components/decorations/Sprinkle";
import TwoColumnLayout from "../components/twoColumnLayout";
import GlobalHeader from "../components/globalHeader";

export default function About({ about }) {
  const { data } = about;

  if (data) {
    const numSections = Array(3).fill(0);

    const decorations = [
      [
        <Circle size={42} fill={colors.accentText} />,
        <Sprinkle stroke={colors.accentSparkle} size="small" />
      ],
      [
        <Square fill={colors.accentText} />,
        <Circle />
      ],
      [
        <Sprinkle stroke={colors.accentSparkle} size="small"/>
      ]
    ];

    return (
      <>
        <GlobalHeader />
        {numSections.map((section, index) => {
          return (
            <TwoColumnLayout 
              key={index}
              heading={data[`section_title_${index + 1}`]?.[0].text} 
              description={data[`description_${index + 1}`]} 
              links={data[`links_${index + 1}`]} 
              decorations={decorations[index]}
              darkMode={index === 1}
            />
          )
        })}
      </>
    )
    }
}

export async function getStaticProps() {
  const about = await client.getSingle("about");

  return {
    props: {
      about
    },
  };
}