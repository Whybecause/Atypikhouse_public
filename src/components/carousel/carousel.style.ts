// Require External Dependencies
import css from "styled-jsx/css";

export default css.global`

.carousel .control-next.control-arrow:before {
  content: '';
  border: solid white;
  border-width: 0 8px 8px 0;
  display: inline-block;
  padding: 14px;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
}

.carousel .control-prev.control-arrow:before {
  content: '';
  border: solid white;
  border-width: 0 8px 8px 0;
  display: inline-block;
  padding: 14px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
}
`;
