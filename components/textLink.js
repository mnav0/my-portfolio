import Link from "next/link";

const TextLink = ({ url, link, label, newTab }) => {

  const intLinkResolver = (doc) => {
    // URL for a project type
    if (doc.type === 'project') {
      return `/projects/${doc.uid}`
    }
  
    // URL for the homepage
    if (doc.type === 'homepage') {
      return `/`
    }

    // URL for the about page
    if (doc.type === 'about') {
      return `/about`
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
      <Link href={url ? url : intLinkResolver(link)} target={newTab ? "_blank" : undefined}>
        {label}
      </Link>
    </>
  )
}

export default TextLink;