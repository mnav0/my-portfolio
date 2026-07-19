import * as prismic from "@prismicio/client";

// -- Prismic Repo Name
export const repoName = "maggie-navracruz";
export const client = prismic.createClient(repoName);

export const linkResolver = (doc) => {
  // internal document types (content relationships)
  if (doc.type === "project") {
    return `/projects/${doc.uid}`;
  }
  if (doc.type === "homepage") {
    return "/";
  }
  if (doc.type === "page") {
    return `/${doc.uid.split("_")[0]}`;
  }

  // link fields
  if (doc.link_type === "Document") {
    return `/${doc.slug}`;
  }
  if (doc.link_type === "Web" || doc.link_type === "Media") {
    return doc.url;
  }

  return "/";
};
