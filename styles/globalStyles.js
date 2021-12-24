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
        font-family: PPNeueMachina-Ultrabold;
        font-weight: 800;
        color: ${colors.darkPurple};
        font-size: 5.75em;
        margin-bottom: 0.25em;

        @media ${devices.tabletPortrait} {
            font-size: 4em;
        }
    } 
    h2, h3, h4, h5 {
        font-family: PPNeueMachina-Regular;
        font-weight: 400;
    }
    p, a  {
        font-family: ObjectSans-Regular;
        font-weight: 400;
        color: ${colors.darkPurple};
        font-size: 1em;
        line-height: 1.2;
        text-decoration: none;
    }
    p strong {
        font-family: ObjectSans-Bold;
        font-weight: 600;
    }
    a:hover {
        font-family: ObjectSans-Bold;
        transition: font-weight 0.2s ease-in-out;
    }
`

export default GlobalStyle;