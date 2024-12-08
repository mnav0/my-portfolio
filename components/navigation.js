import Link from "next/link";
import styled from "styled-components";
import { devices } from "../styles/devices";

const NavigationContainer = styled.div`
  padding: 2em 0;
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

export default function Navigation() {
  return (
      <NavigationContainer>
        <HomeLink href="/">Maggie Navracruz</HomeLink>
        <Pages>
          <Link href="/work">Work</Link>
          <Link href="/about">About</Link>
        </Pages>
      </NavigationContainer>
  )
}
