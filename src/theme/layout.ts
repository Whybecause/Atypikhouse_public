// Require External Dependencies
import css from "styled-jsx/css";

export default css.global`
.gradient1-shadow {
  box-shadow: 5px 5px 5px #0A2B43;
}
.pointer {
  cursor: pointer;
}
/* .hideScrollBarButAllowScroll::-webkit-scrollbar { width: 0 !important } */

.full-container {
  width: 90%;
  margin: auto;
  padding-left: 0.5rem;
  padding-right:0.5rem;
}
.page-container {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.5rem;
  padding-right:0.5rem;
  padding-bottom: 0.5rem;
}
.form-container {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.5rem;
  padding-right:0.5rem;
}
.small-container {
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 0.5rem;
  padding-right:0.5rem;
}

.relative-container {
  position: relative;
}
.relative-container img {
  display: block;
}
.relative-container .absolute-icon {
  position: absolute;
  right: 0;
  top: -5px;
}
.relative-container .absolute-icon2 {
  position: absolute;
  top: 0;
  left: 100;
}
.relative-container .absolute-icon3 {
  position: absolute;
  top: 0;
  left: 25px;
}
.control-arrow, .control-next:before {
  borderLeft: 5px solid gray!important;
}
.datepickerInput {
  background: transparent;
  border: 0.15rem solid #E2E8F0;
  border-radius: 5px;
  padding: 5px 5px 5px 5px;
  width: 100%;
}
.datepickerInput:focus {
  border: 0.15rem solid #3B78DD;
  outline: 0;
}
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  background-color: #aaa;
  }
`;
