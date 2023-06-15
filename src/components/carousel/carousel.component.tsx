// Import External dependencies
import React from "react";
import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import { Box, Skeleton } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

// Import Internal dependencies
import carouselStyles from "./carousel.style";
import { DEFAULT_PICTURE_URL } from "../../config";

const MyCarousel = ({ images, height=['200px'] }): JSX.Element => {
  const [ loaded, setLoaded ] = React.useState<boolean>(false);

  return (
    <>
      <Carousel showThumbs={false} autoPlay={false}>
        {images?.length ? (
          images?.map((image, index) => (
            <Box key={index}
              position="relative"
              objectFit="scale-down"
              h={height}
            >
              <Skeleton isLoaded={loaded}>
              <Image
                src={image}
                layout="fill"
                onLoad={() => setLoaded(true)}
              />
              </Skeleton>
            </Box>
          ))
        ) : (
          <Box position="relative" h="300px">
            <Image src={DEFAULT_PICTURE_URL} layout="fill" />
          </Box>
        )}
      </Carousel>
      <style jsx global>
        {carouselStyles}
      </style>
    </>
  );
};

export default MyCarousel;
