import { colors } from "../../styles/colors";

const SIZE = 42;
const PATH = "M21 6.24419L26.3549 1L28.3789 8.21881L35.6378 6.36223L33.7812 13.6211L41 15.6451L35.7558 21L41 26.3549L33.7812 28.3789L35.6378 35.6378L28.3789 33.7812L26.3549 41L21 35.7558L15.6451 41L13.6211 33.7812L6.36223 35.6378L8.21881 28.3789L1 26.3549L6.24419 21L1 15.6451L8.21881 13.6211L6.36223 6.36223L13.6211 8.21881L15.6451 1L21 6.24419Z";

const Sprinkle = () => {
  return (
    <svg width={SIZE} height={SIZE} fill="none">
      <path d={PATH}
        stroke={colors.action}
        strokeWidth="2"
        strokeLinejoin="bevel"
        />
    </svg>
  )
}

export default Sprinkle;
