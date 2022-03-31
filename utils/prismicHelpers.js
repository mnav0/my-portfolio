// ~/utils/prismicHelpers.js
import Prismic from '@prismicio/client'
import Link from 'next/link'
import {
  apiEndpoint,
  accessToken,
  Router
} from '../prismicConfiguration'

// Helper function to convert Prismic Rich Text links to Next/Link components
export const CustomLink = (type, element, content, index, linkResolver) => {

    return (
        <Link
            key={index}
            href={linkResolver(element)}
        >
            <p>{content}</p>
        </Link>
    )
}

export const getType = ( types ) => {
    let parsedTypes = []

    types.forEach((type) => {
        parsedTypes.push(type.type)
    })

    return parsedTypes;
}