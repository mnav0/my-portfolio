import Link from "next/link";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { colors } from "../styles/colors";

const DarkMode = ({ darkMode, ...props }) => <div {...props}></div>

const DarkModeWrapper = styled(DarkMode)`
  height: ${props => props.darkMode ? "4.75em" : "auto"};
`

const NavigationWrapper = ({ darkMode, ...props }) => <div {...props}></div>

const NavigationContainer = styled(NavigationWrapper)`
  display: flex;
  justify-content: space-between;

  ${({ darkMode }) => darkMode && `
    background-color: ${colors.primaryDark};
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    padding: 4em 5.5vw 2em 5.5vw;

    h3, h4, h5, a {
      color: ${colors.primaryLight};
    }
`}
`

const HomeLink = styled(Link)`
  text-transform: none;
  display: block;
  width: 6em;
  font-family: "ObjectSans-Heavy";
`

const Pages = styled.div`
  width: 12em;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  @media screen and ${devices.mobile} {
    width: 8em;
  }
`

const NavLink = ({ selected, ...props }) => <Link {...props}></Link>

const PageLink = styled(NavLink)`
  text-decoration: ${(props) => props.selected ? `underline ${colors.action}` : 'none'};
`

export default function Navigation({ darkMode, selectedRoute }) {
  return (
    <DarkModeWrapper darkMode={darkMode}>
      <NavigationContainer darkMode={darkMode}>
        <HomeLink href="/">Maggie Navracruz</HomeLink>
        <Pages>
          <PageLink href="/work" selected={selectedRoute === "work"}>Work</PageLink>
          <PageLink href="/about" selected={selectedRoute === "about"}>About</PageLink>
        </Pages>
      </NavigationContainer>
    </DarkModeWrapper>
  )
}
