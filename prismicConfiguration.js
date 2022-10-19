import * as Prismic from '@prismicio/client'

// -- Prismic Repo Name
export const repoName = 'maggie-navracruz'

const routes = [
  { type: 'homepage', path: '/' },
  { type: 'work_page', path: '/work' },
  {
    type: 'page',
    path: '/:uid',
  },
  {
    type: 'project',
    path: '/projects/:uid',
  },
]

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`

export const client = Prismic.createClient(apiEndpoint, { routes });

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = ''

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
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
    return `/${doc.uid}`
  }

  if (doc.link_type === "Web" || doc.link_type === "Media") {
    return doc.url;
  } 

  // Backup for all other types
  return '/'
}
// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
// export const Router = {
//   routes: [
//     {
//       "type":"page",
//       "path":"/:uid"
//     },
//     { type: 'homepage', path: '/' },
//     { type: 'work page', path: '/work' },
//   ]
// };