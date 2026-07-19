import Link from "next/link";
import styled from "styled-components";
import { colors } from "../styles/colors";

const Base = ({ variant, href, type = "button", target, children, ...props }) => {
  if (href) {
    if (href.startsWith("http") || target === "_blank") {
      return <a href={href} target={target || "_blank"} rel="noopener noreferrer" {...props}>{children}</a>
    }
    return <Link href={href} target={target} {...props}>{children}</Link>
  }
  return <button type={type} {...props}>{children}</button>
}

const StyledButton = styled(Base)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4em;
  margin: 0;
  padding: 0.5em 1em;
  border-radius: 0;
  border: 1px solid ${colors.action};
  text-transform: uppercase;
  text-decoration: none;
  cursor: pointer;
  appearance: none;
  background: ${(props) => props.variant === "solid" ? colors.action : "transparent"};
  color: ${(props) => props.variant === "solid" ? colors.primaryLight : colors.action};

  &:hover {
    text-decoration: none;
  }
`

export default function Button({ children, variant = "outline", ...props }) {
  return (
    <StyledButton variant={variant} {...props}>
      {children}
    </StyledButton>
  )
}
