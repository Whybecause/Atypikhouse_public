// Import Third-party Dependencies
import {
  Popover,
  PopoverBody,
  Box,
  PopoverCloseButton,
  PopoverArrow,
  PopoverTrigger,
  IconButton,
  PopoverContent,
} from "@chakra-ui/react";


const InfoPopover = ({
  isOpen,
  onOpen,
  onClose,
  icon,
  placement,
  title,
  textBody,
}): JSX.Element => {
  return (
    <Popover
      isLazy
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement={placement}
    >
      <Box d="flex" alignItems="center" justifyContent="center">
        <Box as="h5" d="inline-block" mr="2">{title}</Box>
        <PopoverTrigger>
          <IconButton variant="blue" size="sm" aria-label="information" icon={icon} />
        </PopoverTrigger>
      </Box>
      <PopoverContent p="5" color="white" bg="brand.blue2" borderColor="brand.blue1">
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody>{textBody}</PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default InfoPopover;
