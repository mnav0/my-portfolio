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
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 1em;
  width: ${(props) => props.large ? `16em` : `20em`};

  & p {
    margin: 0 1em 0 0;
    font-size: ${(props) => props.large ? `1.5em` : `1.125em`};
  }

  & a {
    margin-right: ${(props) => props.back ? `0` : `1em`};
    margin-left: ${(props) => props.back ? `1em` : `0`};
    cursor: pointer;
    font-size: ${(props) => props.large ? `1.5em` : `1.125em`};
  }

  & a:hover {
    margin-left: ${(props) => props.back ? `1.5em` : `0`};
    margin-right: ${(props) => props.back ? `0` : `1.5em`};
    transition: all 0.1s ease-in-out;
  }

  @media ${devices.tabletPortrait} {
    width: 9.9em;

    & p {
      font-size: ${(props) => props.large ? `1em` : `1.125em`};
    }
    & a {
      font-size: 1em;
      margin-right: 0.5em;
    }
    & a:hover {
      margin-right: 0.75em;
    }
  }

  @media ${devices.mobile} {
    width: ${(props) => props.large ? `8.5em` : `11em`};

    & a {
      margin-right: 0.25em;
    }
    & a:hover {
      margin-right: 0.5em;
    }
  }
`

const ArrowLink = ({ url, link, label, newTab, back, large }) => {

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
      <LinkContainer back={back} large={large}>
        {back && 
          <ArrowContainer large={large} back={back}>
            <Img src={BackArrow} />
          </ArrowContainer>
        }
        <Link href={url ? url : intLinkResolver(link)}>
          <a target={newTab ? "_blank" : ""}>{label}</a>
        </Link>
        {!back && 
          <ArrowContainer large={large} back={back}>
            <Img src={Arrow} />
          </ArrowContainer>
        }
      </LinkContainer>
    </>
  )
}

export default ArrowLink;