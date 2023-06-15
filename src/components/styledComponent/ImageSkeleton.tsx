import React from "react";
import { Skeleton, Image } from "@chakra-ui/react";

const ImageSkeleton = (props) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  return (
    <Skeleton isLoaded={loaded}>
      <Image
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </Skeleton>
  )
}

export default ImageSkeleton;

