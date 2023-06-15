// Import Third-party Dependencies
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  Box,
  Center,
  Divider,
  Skeleton
} from "@chakra-ui/react";
import { InfoOutlineIcon } from "@chakra-ui/icons";

// Import Internal Dependencies
import { MyModal } from "../../../../components/styledComponent";
import EditPropertyType from "./EditPropertyType.component";
import DeletePropertyType from "./DeletePropertyType";
import { useAppSelector } from "../../../../hooks/reduxHook";
import { selectUser } from "../../../../slices/userSlice";
import { DEFAULT_PICTURE_URL } from "../../../../config";

interface IPropertyCard {
  propertyType: any,
}
const PropertyTypeExcerpt = ({ propertyType }: IPropertyCard): JSX.Element => {
  const router = useRouter();
  const user = useAppSelector(selectUser);

  const [ loaded, setLoaded ] = React.useState<boolean>(false);

  const isAdmin = user?.role === "ADMIN";
  const imageUri = propertyType?.image?.[0]?.uri;

  return (
    <Box
      w="300px"
      h="380px"
      backgroundSize="cover"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Box
        position="relative"
        objectFit="scale-down"
        w="300px"
        h="300px"
      >
        <Skeleton isLoaded={loaded}>
        <Image
          src={imageUri ? imageUri : DEFAULT_PICTURE_URL}
          alt="Image de catégorie"
          layout="fill"
          className="pointer"
          onLoad={() => setLoaded(true)}
          onClick={() => router.push({
            pathname: "/search/[pid]",
            query: {
              pid: "France",
              name: null,
              dateStart: null,
              dateEnd: null,
              typeId: propertyType?.id
            }
          })}
        />
        </Skeleton>
      </Box>
      <Center>
        <Box as="h2" fontWeight="semibold">{`${propertyType?.type}`}</Box>
        <MyModal
          toggle={
            <InfoOutlineIcon ml="2" className="pointer" />
          }
          body={
            <Box
              mt="1"
              as="h4"
              lineHeight="tight"
              isTruncated
            >
              {propertyType?.description}
            </Box>}
        />
      </Center>

      {isAdmin && (
        <>
          <Divider />
          <Box p="2" d="flex" justifyContent="space-between">
            <EditPropertyType propertyType={propertyType} />
            <DeletePropertyType id={propertyType?.id} />
          </Box>
        </>
      )}
    </Box>
  );
};


export default PropertyTypeExcerpt;
