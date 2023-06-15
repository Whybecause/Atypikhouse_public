// Import Third-party Dependencies
import React from "react";
import { useToast } from "@chakra-ui/react";

// Import Internal Dependencies
import {
  useAppDispatch,
  useAppSelector
} from "../../hooks/reduxHook";
import { resetErrorSuccessModal } from "../../slices/error-successSlice";

const ErrorSuccessModal = (): JSX.Element => {
  const errorState = useAppSelector((state) => state.errors);

  const toast = useToast();
  const toastStatus = errorState.success ? "success" : "error";

  const dispatch = useAppDispatch();
  const resetModal = () => dispatch(resetErrorSuccessModal());

  React.useEffect(() => {
    if (errorState.showModal === true) {
      toast ({position: "top", status: toastStatus, title: errorState.message, isClosable: true});
      resetModal();
    }
  }, [errorState]);

  return (null);
};


export default ErrorSuccessModal;
