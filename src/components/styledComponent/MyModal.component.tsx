// Import Third-party Dependencies
import React from "react";
import {
  useDisclosure,
  Button,
  Icon,
  Modal, ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useColorModeValue
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

interface IMyModal {
  size?: string;
  toggle?: any;
  header?: any;
  body?: any;
  cancel?: any;
  confirm?: any;
  isClosableBottom?: boolean;
  closeModal?: boolean;
  openModal?: boolean;
  displayFooter?: boolean;
}

const MyModal: React.FC<IMyModal> = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const color = useColorModeValue("brand.dark", "white");

  React.useEffect(() => {
    if (props.closeModal === true) {
      onClose();
    }
  }, [props.closeModal]);

  React.useEffect(() => {
    if (props.openModal === true) {
      onOpen();
    }
  }, [props.openModal]);

  return (
    <>
      <div onClick={onOpen}>{props.toggle}</div>
      <Modal isOpen={isOpen} onClose={onClose} size={props.size}>
        <ModalOverlay />
        <ModalContent color={color}>
          <ModalCloseButton />
          <ModalHeader>{props.header}</ModalHeader>
          <ModalBody>{props.body}</ModalBody>
          {props.displayFooter && (
            <ModalFooter d="flex" justifyContent="space-between">
              <div onClick={onClose}>{props.cancel}</div>
              {props.confirm}
              {props.isClosableBottom && (
                <Button onClick={onClose}><Icon as={CloseIcon} /></Button>
              )}
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};


export default MyModal;
