import * as prismic from '@prismicio/client'

// -- Prismic Repo Name
export const repoName = 'maggie-navracruz'
export const client = prismic.createClient(repoName);

export const extLinkResolver = (doc) => {
  if (doc.link_type === "Document") {
    return `/${doc.slug}`;
  } else if (doc.link_type === "Web" || doc.link_type === "Media") {
    return doc.url;
  }
  return "/";
};
