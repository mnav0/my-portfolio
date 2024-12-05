import { createGlobalStyle } from "styled-components"
import { colors } from "./colors"
import { devices } from "./devices"

const GlobalStyle = createGlobalStyle`  
    body {
        padding: 4rem 5.5% 2rem 5.5% !important;
        width: 100%;
        background-color: ${colors.primaryLight};
    }
    h1, h2 {
        font-family: BentogaItalic-Thin;
        text-transform: uppercase;
        font-weight: 400;
        color: ${colors.primaryDark};
        font-size: 3.75em;
        margin-bottom: 0.25em;

        @media ${devices.tabletPortrait} {
            font-size: 4em;
        }
    }
    h3, h4, h5, p, a {
        font-family: ObjectSans-Regular;
        font-weight: 400;
        color: ${colors.primaryDark};
        font-size: 1.25em;
        line-height: 1.1;
    }
    h3, h4, h5 {
        text-transform: uppercase;
    }
    p strong {
        font-family: ObjectSans-Bold;
        font-weight: 600;
    }
    p a {
        color: ${colors.action};
    }
    a {
        font-family: ObjectSans-Regular;
        font-weight: 400;
        color: ${colors.action};
        font-size: 1.25em;
        text-transform: uppercase;
        text-decoration: none;
    }
    a:hover {
        text-decoration: underline;
    }
`

export default GlobalStyle;