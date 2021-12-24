const Prismic = require('@prismicio/client');

// -- Prismic Repo Name
export const repoName = 'maggie-navracruz'

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`

export const Client = Prismic.client(apiEndpoint);

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = ''

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
    // URL for a page type
    if (doc.link_type === 'Document') {
        return `/${doc.slug}`;
    } else if (doc.link_type === 'Web') {
        return doc.url;
    } else {
        return '/';
    }
}
// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
export const Router = {
  routes: [
    {
      "type":"page",
      "path":"/:uid"
    },
    { type: 'homepage', path: '/' },
    { type: 'work page', path: '/work' },
  ]
};