const Button = {
  baseStyle: {
    outline: "none",
    whiteSpace: "no-wrap",
    fontWeight: "bold",
    color: "white",
    _hover: {
      bg: "brand.blue2",
    },
    _active: {
      boxShadow: "0 0 1px 5px tomato",
    },
    _focus: {
      boxShadow: "0 0 1px 2px tomato",
    },
  },
  variants: {
    "blue": {
      bg: "brand.blue1",
      _hover: {
        color: "white"
      }
    },
    "burger": {
      bg: "brand.blue2",
      borderRadius: "full"
    },
    "orange": {
      bg: "brand.orange2",
      _hover: {
        color: "white"
      },
      _focus: {
        bg: "brand.orange1"
      }
    },
    "light": {
      bg: "brand.light",
      color: "black",
      _hover: {
        color: "white"
      },
      _focus: {
        color: "black"
      }
    },
    "danger": {
      bg: "brand.danger",
      _hover: {
        color: "white"
      }
    },
  },
  defaultProps: {
    variant: "blue"
  }
};

export default Button;