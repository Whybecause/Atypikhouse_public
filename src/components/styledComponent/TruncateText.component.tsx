// Import Third-party Dependencies
import React from "react";
import ShowMoreText from "react-show-more-text";
import { Collapse, useDisclosure} from "@chakra-ui/react";

const TruncateText = (props): JSX.Element => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <ShowMoreText
      lines={10}
      more="Voir plus"
      less="Voir moins"
      onClick={onToggle}
      width={5000}
    >
      <Collapse in={isOpen} animateOpacity>
        {props.content}
      </Collapse>
    </ShowMoreText>
  );
};


export default TruncateText;
