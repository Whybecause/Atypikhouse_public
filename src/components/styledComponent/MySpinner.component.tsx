// Import Third-party Dependencies
import { Box, Spinner } from "@chakra-ui/react";

const MySpinner = ({ ...props }): JSX.Element => {
  return (
    <Box d="flex" alignItems="center" mt="5" justifyContent="center" margin="auto">
      <Spinner
        thickness="4px"
        {...props}
      />
    </Box>
  );
};


export default MySpinner;
