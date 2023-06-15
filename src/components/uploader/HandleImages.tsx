// Import Third-party Dependencies
import Image from "next/image";
import { AddIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import React, { useRef } from "react";

// Import Internal Dependencies
import { IconAdd } from "../styledComponent";

const HandleImageUpload = ({
  base64,
  setBase64,
  displayPreview = false,
  loadBtn = false,
  loadAbsoluteBtn = false
}): JSX.Element => {
  const fileInput = useRef(null);

  const onChangeImage = (e: any) => {
    console.log("file", e.target.files[0]);
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
    console.log("reader", reader);
    console.log("file", file);
    if (reader !== undefined && file !== undefined) {
      reader.onloadend = () => {
        setBase64(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onChange={(e) => onChangeImage(e)}>
      <input type="file" id="file" onChange={ImgUpload} src={base64} ref={fileInput} style={{ display: "none" }} />
      <div onClick={() => fileInput.current && fileInput.current.click()}>
        {loadBtn && (
          <Button
            size="sm"
            variant="light"
            mb="5"
            rightIcon={<AddIcon />}>Charger une image
          </Button>
        )}
        {loadAbsoluteBtn && (
          <IconAdd size="xs" className="absolute-icon" />
        )}
      </div>

      {displayPreview && base64 && (
        <Image src={base64} width="80" height="80" />
      )}
    </form>
  );
};


export default HandleImageUpload;
