import { colors } from "../../styles/colors";

const SIZE = 24;

const Circle = ({ fill }) => {
  return (
    <svg height={SIZE} width={SIZE}>
      <circle
        cx={SIZE / 2}
        cy={SIZE / 2}
        r={SIZE / 2}
        fill={fill ?? colors.action}
      />
    </svg>
  )
}

export default Circle;
