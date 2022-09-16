import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { useDisclosure } from "@chakra-ui/hooks";
import Icon from "@chakra-ui/icon";
import { Input } from "@chakra-ui/input";
import { Center, HStack, Text, VStack } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/modal";
import axios from "axios";
import { FormEvent, FormEventHandler, useState } from "react";
import { MdAddCircleOutline } from "react-icons/md";

export const RequestSeatButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [social, setSocial] = useState("");
  const [company, setCompany] = useState("");

  const subscribe: FormEventHandler<HTMLFormElement> = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setStatus("");
      await axios.post("/api/subscribe", {
        email,
        name,
        company,
        social,
      });
      onClose();
    } catch (e) {
      setStatus(
        "Oops. An unexpected error ocurred.\n Remember that you can only subscribe once."
      );
    }
  };

  return (
    <>
      <Center
        paddingTop={{ base: "20px", lg: "0" }}
        minW={{ base: "100%", lg: "0" }}
      >
        <Button
          px="25px"
          py={{ base: "25px", lg: "30px" }}
          bg="white"
          onClick={onOpen}
        >
          <HStack>
            <Icon as={MdAddCircleOutline} color="black" fontSize="20" />
            <Text color="black" fontSize={{ base: "15", lg: "20" }}>
              Request Seat
            </Text>
          </HStack>
        </Button>
      </Center>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered={true}
        onCloseComplete={() => {
          setStatus("");
        }}
      >
        <ModalOverlay />
        <ModalContent bg="black" p="25px">
          <ModalHeader></ModalHeader>
          <ModalCloseButton color="grey" />
          <form onSubmit={subscribe}>
            <ModalBody>
              <VStack>
                <FormControl>
                  <FormLabel>
                    <Text>Name</Text>
                  </FormLabel>
                  <Input
                    required
                    type="text"
                    color="white"
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <Text>Company</Text>
                  </FormLabel>
                  <Input
                    required
                    type="text"
                    color="white"
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <Text>Email</Text>
                  </FormLabel>
                  <Input
                    required
                    type="email"
                    color="white"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>
                    <Text>Twitter/GitHub/Other (opt)</Text>
                  </FormLabel>
                  <Input
                    type="text"
                    color="white"
                    onChange={(e) => setSocial(e.target.value)}
                  />
                </FormControl>
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button variant="outline" type="submit">
                <Text>Apply</Text>
              </Button>
            </ModalFooter>
            {status ? <Text align="center">{status}</Text> : <></>}
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};
