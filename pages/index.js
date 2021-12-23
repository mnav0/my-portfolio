import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Client } from "../prismicConfiguration";

export default function Home({ homepage }) {
  return (
    <></>
  )
}

export async function getStaticProps() {
  const homepage = await Client.getSingle("homepage");

  return {
    props: {
      homepage
    },
  };
}