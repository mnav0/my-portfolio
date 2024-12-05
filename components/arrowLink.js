import GlobalStyle from "../styles/globalStyles";
import Link from "next/link"
import styled from "styled-components"
import Arrow from "../assets/arrow.svg"
import BackArrow from "../assets/backArrow.svg"
import { devices } from "../styles/devices"
import Img from "next/image";

const ArrowContainer = styled.div`
  width: 2.25em;
  height: 0.75em;
  margin-right: ${(props) => props.back || !props.large ? `0.5em` : `3em`};
  margin-top: ${(props) => props.large ? `0.5em` : `0.3em`};

  @media ${devices.tabletPortrait} {
    margin-top: 0.2em;
    margin-right: ${(props) => props.back || !props.large ? `0.5em` : `1.5em`};
    width: 2em;
  }

  @media ${devices.mobile} {
    width: 1.5em;
    margin-right: ${(props) => props.back || !props.large ? `0.25em` : `1em`};
  }
`

const LinkContainer = styled.div`

`

const ArrowLink = ({ url, link, label, newTab }) => {

  const intLinkResolver = (doc) => {
    // URL for a category type
    if (doc.type === 'project') {
      return `/projects/${doc.uid}`
    }
  
    // URL for a product type
    if (doc.type === 'homepage') {
      return `/`
    }
  
    // URL for a page type
    if (doc.type === 'page') {
      const url = doc.uid.split("_")[0]
      return `/${url}`
    }
  
    if (doc.link_type === "Web" || doc.link_type === "Media") {
      return doc.url;
    } 
  
    // Backup for all other types
    return '/'
  }

  return (
    <>
      <GlobalStyle />
      <LinkContainer>
        <Link href={url ? url : intLinkResolver(link)}>
          <a target={newTab ? "_blank" : ""}>{label}</a>
        </Link>
      </LinkContainer>
    </>
  )
}

export default ArrowLink;