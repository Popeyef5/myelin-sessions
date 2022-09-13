import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { HStack, Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import { MdAddCircleOutline } from "react-icons/md";

export const RequestSeatButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button px="25px" py="30px" bg="white" onClick={onOpen}>
        <HStack>
          <Icon as={MdAddCircleOutline} color="black" />
          <Text color="black">Request Seat</Text>
        </HStack>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent bg="black" p="25px">
          <ModalHeader></ModalHeader>
          <ModalCloseButton color="grey" />
          <form>
            <ModalBody>
              <VStack>
                <FormControl>
                  <FormLabel>
                    <Text>Name</Text>
                  </FormLabel>
                  <Input type="text" color="white" />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <Text>Company</Text>
                  </FormLabel>
                  <Input type="text" color="white" />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <Text>Email</Text>
                  </FormLabel>
                  <Input type="email" color="white" />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" type="submit">
                <Text>Apply</Text>
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
