import { colors } from "../../styles/colors";

const SIZE = 40;

const Square = ({ fill }) => {
  return (
    <svg height={SIZE} width={SIZE}>
      <rect height={SIZE} width={SIZE} fill={fill ?? colors.action}/>
    </svg>
  )
}

export default Square;
