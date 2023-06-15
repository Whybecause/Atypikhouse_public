// Require External Dependencies
import css from "styled-jsx/css";

export default css.global`
/* Buttons toolbar */
.rbc-toolbar button {
  background: #3B78DD;
  color: white;
}
.rbc-active {
  color: black!important;
}

/* Today cell */
.rbc-today {
  background: #D1EFF1;
}
.rbc-current {
  color: black;
}

/* Off range cells */
.rbc-off-range-bg {
  background: black;
  opacity: 0.2;
}
`;
