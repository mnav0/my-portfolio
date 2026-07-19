import Link from "next/link";
import styled from "styled-components";
import { colors } from "../styles/colors";

const NavigationContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const HomeLink = styled(Link)`
  text-transform: none;
  display: block;
  width: 6em;
  font-family: "ObjectSans-Heavy";
`

const NavLink = ({ selected, ...props }) => <Link {...props}></Link>

const PageLink = styled(NavLink)`
  text-decoration: ${(props) => props.selected ? `underline ${colors.action}` : 'none'};
`

export default function Navigation({ selectedRoute }) {
  return (
    <NavigationContainer>
      <HomeLink href="/">Maggie Navracruz</HomeLink>
      <PageLink href="/#work" selected={selectedRoute === "work"}>Work</PageLink>
    </NavigationContainer>
  )
}
