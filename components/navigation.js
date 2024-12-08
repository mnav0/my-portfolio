import Link from "next/link";
import styled from "styled-components";
import { devices } from "../styles/devices";
import { colors } from "../styles/colors";

const NavigationContainer = styled.div`
  padding: 0 0 2em;
  display: flex;
  justify-content: space-between;
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

export default function Navigation({ selectedRoute }) {
  debugger;
  return (
      <NavigationContainer>
        <HomeLink href="/">Maggie Navracruz</HomeLink>
        <Pages>
          <PageLink href="/work" selected={selectedRoute === "work"}>Work</PageLink>
          <PageLink href="/about" selected={selectedRoute === "about"}>About</PageLink>
        </Pages>
      </NavigationContainer>
  )
}
