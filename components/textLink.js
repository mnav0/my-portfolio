import Link from "next/link";
import { linkResolver } from "../prismic";

const TextLink = ({ link, label, newTab }) => {
  return (
    <>
      <Link href={linkResolver(link)} target={newTab ? "_blank" : undefined}>
        {label}
      </Link>
    </>
  )
}

export default TextLink;
