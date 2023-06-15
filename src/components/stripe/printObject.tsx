// Import Third-party Dependencies
import React from "react";

interface Props {
  content: any;
}

const PrintObject = ({ content }: Props): JSX.Element => {
  const formattedContent: string = JSON.stringify(content, null, 2);
  return <pre>{formattedContent}</pre>;
};


export default PrintObject;
