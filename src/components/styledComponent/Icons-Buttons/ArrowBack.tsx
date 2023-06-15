// Import Third-party Dependencies
import React from "react";
import Link from "next/link";
import { IconButton } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";

const ArrowBack = (props): JSX.Element => {
  const url: string = props.url;
  const Icon = <IconButton icon={<ArrowBackIcon />} aria-label="Back" {...props} />

  return (
    <>
      {url
        ? (<Link href={url}>{Icon}</Link>)
        : ( Icon )
      }
    </>
  );
};


export default ArrowBack;
