import { useState, useEffect } from "react";
import { IUser } from "../slices/userSlice";

const useUserImage = (user: IUser, base64: string) => {
  const [userImage, setUserImage] = useState<string>();

  useEffect(() => {
    if (base64) {
      setUserImage(base64);
    }
    else {
      if (user?.customImage?.uri) {
        setUserImage(user?.customImage?.uri);
      }
      if (!user?.customImage?.uri) {
        setUserImage(user?.image);
      }
    }

  }, [user, base64]);

  return { userImage };
};


export default useUserImage;
