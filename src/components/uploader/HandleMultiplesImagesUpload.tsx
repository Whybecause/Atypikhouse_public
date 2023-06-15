// Import Internal Dependencies
import React, { useRef } from "react";
import {
  Box,
  SimpleGrid,
  Text,
  Image
} from "@chakra-ui/react";

// Import Internal Dependencies
import {
  AddButton,
  IconDelete,
  ToggleShow
} from "../styledComponent";

const HandleMultipleImagesUpload = ({ files, setFiles }): JSX.Element => {
  const MAX_SIZE_BYTES = 4e+8;
  const fileInput = useRef(null);
  const [canSubmit, setCanSubmit] = React.useState<boolean>(true);
  const [bytesCount, setBytesCount] = React.useState(0);


  const onChangeImage = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file);
    }
  };

  const ImgUpload = (e: any) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        const newCount = bytesCount + file.size;

        if (newCount < MAX_SIZE_BYTES) {
          setCanSubmit(true);
          setBytesCount(newCount);
          setFiles([...files, {
            size: file.size,
            name: file.name,
            base64: reader.result
          }]);
        }
        else {
          setCanSubmit(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = async (index) => {
    const filesAfterDelete = files.filter((_, i) => i !== index);
    setFiles(filesAfterDelete);
    setBytesCount(bytesCount - files[index].size);
  };

  React.useEffect(() => {
    if (bytesCount < MAX_SIZE_BYTES) {
      setCanSubmit(true);
    }
    else {
      setCanSubmit(false);
    }
  }, [bytesCount]);


  return (
    <form onChange={(e) => onChangeImage(e)}>
      <input type="file" id="file" onChange={ImgUpload} src={files} ref={fileInput} style={{ display: "none" }} />
      <div onClick={() => fileInput.current && fileInput.current.click()}>
        <AddButton variant="light" mb="5" size="sm" content="Charger une image" />
        {!canSubmit && (
          <Text mb="2" color="red" fontWeight="bold">Taille limite dépassée.</Text>
        )}
      </div>

      {Boolean(files?.length) && (
        <ToggleShow
          toggleMessage={`Images (${files?.length})`}
          defaultState={false}
        >
          <SimpleGrid columns={[4]} spacing={10}>
            {files.map((file, index) => (
              <Box position="relative" key={index}>
                <Image src={file.base64} boxSize="100%" objectFit="cover" />
                <IconDelete
                  onClick={() => removeImage(index)}
                  size="xs"
                  className="absolute-icon"
                />
              </Box>
            ))}
          </SimpleGrid>
        </ToggleShow>
      )}
    </form>
  );
};


export default HandleMultipleImagesUpload;
