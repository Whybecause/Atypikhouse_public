// Require External Dependencies
import css from "styled-jsx/css";

export default css.global`
.autocomplete {
  position: relative;
  display: inline-block;
  width: 100%;
}
.autocomplete-active {
  padding: 10px;
  cursor: pointer;
  background-color: #3B78DD!important;
  color: white!important;
  border-bottom: 1px solid #d4d4d4;
}
.autocomplete-item {
  padding: 10px;
  border-bottom: 1px solid #d4d4d4;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  top: 100%;
  left: 0;
  right: 0;
}
`;