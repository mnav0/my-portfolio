import { createGlobalStyle } from "styled-components"
import { colors } from "./colors"
import { devices } from "./devices"

const GlobalStyle = createGlobalStyle`  
    body {
        padding: 4rem 5.5% 2rem 5.5% !important;
        width: 100%;
        background-color: ${colors.cream};
    }
    h1 {
        font-family: ClashDisplay-Regular;
        font-weight: 400;
        color: ${colors.darkBlue};
        font-size: 5.75em;
        margin-bottom: 0.25em;

        @media ${devices.tabletPortrait} {
            font-size: 4em;
        }
    } 
    h2 {
        font-family: ClashDisplay-Regular;
        font-weight: 400;
        color: ${colors.darkBlue};
        font-size: 3em;
        margin: 0;
    }
    h3, h4 {
        font-family: ClashDisplay-Regular;
        font-weight: 400;
    }
    h5 {
        font-family: ClashDisplay-Regular;
        font-weight: 400;
        font-size: 1.25em;
        margin: 0.25em 0;
    }
    p, a  {
        font-family: ObjectSans-Regular;
        font-weight: 400;
        color: ${colors.darkBlue};
        font-size: 1em;
        line-height: 1.4;
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