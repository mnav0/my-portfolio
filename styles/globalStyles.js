import { createGlobalStyle } from "styled-components"
import { colors } from "./colors"
import { devices } from "./devices"

const GlobalStyle = createGlobalStyle`
    body {
        padding: 2rem 5.5%;
        width: 100%;
        background-color: ${colors.lightPurple};
    }
    h1 {
        color: ${colors.darkPurple};
        font-size: 5.75em;
        margin-bottom: 0.25em;

        @media ${devices.tabletPortrait} {
            font-size: 4em;
        }
    } 
    p, a  {
        color: ${colors.darkPurple};
        font-size: 1em;
        line-height: 1.2;
    }
    a:hover {
        font-family: "object-sans-bold";
        transition: font-weight 0.2s ease-in-out;
    }
`

export default GlobalStyle;