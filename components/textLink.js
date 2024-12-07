import GlobalStyle from "../styles/globalStyles";
import Link from "next/link";

const TextLink = ({ url, link, label, newTab }) => {

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
        <Link href={url ? url : intLinkResolver(link)}>
          <a target={newTab ? "_blank" : ""}>{label}</a>
        </Link>
    </>
  )
}

export default TextLink;