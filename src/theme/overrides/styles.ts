const styles = {
  global: {
    "html, body": {
      lineHeight: "tall",
      padding: "0",
      margin: "auto",
      maxWidth: "100vw",
      height: "100%",
    },
    body: {
      margin: "0",
      padding: "0",
      fontSize: "16px",
      fontWeight: "500",
    },
    "*" : {
      boxSizing: "border-box",
    },
    a: {
      fontSize: "0.9rem",
      fontWeight: "700",
      display: "inline-bloc",
      textDecoration: "none",
    },
    "a[data-active='true']" : {
      color: "brand.orange1",
      textDecoration: "underline",
    },
    "a:hover" : {
      textDecoration: "underline",
      cursor: "pointer",
    },
    ":target" : {
      textDecoration: "underline",
    },
    p: {
      fontWeight: "500"
    },
    h1: {
      fontSize: "1.5rem",
      fontWeight: "700",
    },
    h2: {
      fontSize: "1.4rem",
      fontWeight: "700",
    },
    h3: {
      fontSize: "1.2rem",
      fontWeight: "700",
    },
    h4: {
      fontSize: "1.1rem",
      fontWeight: "700",
    },
    h5: {
      fontSize: "1rem",
      fontWeight: "700",
    },
  },
};

export default styles;