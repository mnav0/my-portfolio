import GlobalStyle from "../styles/globalStyles";
import Link from "next/link"
import styled from "styled-components"
import { colors } from "../styles/colors"
import { useRouter } from "next/router";

const NavContainer = styled.div`
  display: inline-flex;
  position: absolute;
  width: 100%;
  padding: 0.5em 5.5% 0.25em 5.5%;
  left: 0;
  top: 0;
  background-color: ${colors.darkBlue};
  color: ${colors.cream};
  justify-content: space-between;

  & > a {
    color: ${colors.cream};
    margin: 0.5em 0;
    ${props => props.activeWork == true && `border-bottom: 2px solid ${colors.yellow}`};
  }

  & > h5 {
    cursor: pointer;
  }

`

const Header = ( ) => {
  const router = useRouter();

  return (
    <>
      <GlobalStyle />
      <NavContainer activeWork={router.pathname == "/work"}>
        <Link href="/">
          <h5>magdalena navracruz</h5>
        </Link>
        <Link href="/work">
          work
        </Link>
      </NavContainer>
    </>
  )
}

export default Header;