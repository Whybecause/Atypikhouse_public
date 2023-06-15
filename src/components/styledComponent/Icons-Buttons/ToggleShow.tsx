// Import Third-party Dependencies
import React, { ReactNode } from "react";
import { Box, Button } from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";


interface IToggleShow {
  toggleMessage: string;
  defaultState: boolean;
  height?: string;
  size?: string;
  children: ReactNode;
}

const ToggleShow = ({ size = "xs", height, toggleMessage, children, defaultState }: IToggleShow): JSX.Element => {
  const [showImages, setShowImages] = React.useState<boolean>(defaultState);

  const toggleShow = () => setShowImages(!showImages);

  return (
    <>
      <Box onClick={toggleShow} mt="2" className="form-container">
        {showImages
          ? (
            <Button
              variant="outline"
              isFullWidth
              mb="5"
              h={height}
            >
              {toggleMessage}
              <ArrowUpIcon />
            </Button>
          )
          : (
            <Button
              variant="outline"
              isFullWidth
              size={size}
              h={height}
            >
              {toggleMessage}
              <ArrowDownIcon />
            </Button>
          )}
      </Box>
      {showImages && (children)}
    </>
  );
};


export default ToggleShow;

