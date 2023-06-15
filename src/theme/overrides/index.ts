import { extendTheme } from "@chakra-ui/react";

import styles from "./styles";
import colors from "./foundations/colors";
import fonts from "./foundations/fonts";
import { Button } from "./components";

const overrides = {
  styles,
  colors,
  fonts,
  components: { Button }
};

export default extendTheme(overrides);