import Link from "next/link";
import styled from "styled-components";

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

export default function Navigation() {
  return (
    <NavigationContainer>
      <HomeLink href="/">Maggie Navracruz</HomeLink>
      <Link href="/#work">Work</Link>
    </NavigationContainer>
  )
}
