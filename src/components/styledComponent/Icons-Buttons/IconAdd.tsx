// Import Third-party Dependencies
import { IconButton } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

interface IconAddProps {
  size?: string;
  className?: string;
  onClick?: any
}

const IconAdd = ({ size, className, onClick }: IconAddProps): JSX.Element => {
  return (
    <IconButton
      variant="blue"
      size={size}
      className={className}
      aria-label="Add to friends"
      icon={<AddIcon />}
      onClick={onClick}
    />
  );
};


export default IconAdd;
