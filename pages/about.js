import { client } from "../prismicConfiguration";
import GlobalStyle from "../styles/globalStyles";
import { colors } from "../styles/colors";
import Head from "next/head";
import Square from "../components/decorations/Square";
import Circle from "../components/decorations/Circle";
import Sprinkle from "../components/decorations/Sprinkle";
import TwoColumnLayout from "../components/twoColumnLayout";
import React from "react";

export default function About({ about }) {
  const data = about.data;
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
      <GlobalStyle />
      <Head>
        <title>Magdalena Navracruz - About</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      
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

export async function getStaticProps() {
  const res = await client.query();
  const about = await client.getSingle("about");

  return {
    props: {
      about
    },
  };
}