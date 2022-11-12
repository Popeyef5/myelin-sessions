import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Center, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/layout";
import { HiShare, HiOutlineMail } from "react-icons/hi";
import { BsWhatsapp, BsTwitter, BsLinkedin } from "react-icons/bs";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/modal";
import { useDisclosure } from "@chakra-ui/hooks";
import { useRouter } from "next/router";
import {
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
  LinkedinShareButton,
} from "next-share";
import { useEffect, useState } from "react";

export const ShareButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const url = "123";
  // const [url, setUrl] = useState("");
  // useEffect(() => {
  //   setUrl(window.location.origin + router.asPath);
  // }, []);

  return (
    <>
      <Button
        px={{ base: "20px", lg: "25px" }}
        py={{ base: "25px", lg: "30px" }}
        _hover={{ bg: "#000f14" }}
        _focus={{ bg: "#000f14" }}
        onClick={onOpen}
        variant="outline"
        width="min-content"
      >
        <HStack>
          <Icon as={HiShare} color="white" fontSize="20" />
          <Text fontSize={{ base: "15", lg: "20" }}>Share</Text>
        </HStack>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#000f14" border="2px solid white">
          <ModalBody padding="25px">
            <VStack gap="20px">
              <Text fontSize="18px">
                Share this Session with whomever you think might find it
                interesting.
              </Text>

              {/* <Flex width="100%">
                <Spacer />
                <WhatsappShareButton
                  url={url}
                  title="MEV technology for YCombinator"
                  blankTarget={true}
                >
                  <Icon as={BsWhatsapp} color="#00e66c" fontSize="50" />
                </WhatsappShareButton>
                <Spacer />
                <TwitterShareButton url={url} blankTarget={true}>
                  <Icon as={BsTwitter} color="#00a5f0" fontSize="50" />
                </TwitterShareButton>
                <Spacer />
                <EmailShareButton url={url}>
                  <Icon as={HiOutlineMail} color="#ffffff" fontSize="50" />
                </EmailShareButton>
                <Spacer />
                <LinkedinShareButton url={url}>
                  <Icon
                    as={BsLinkedin}
                    color="#007ab3"
                    fontSize="50"
                    bg="white"
                    borderRadius="6"
                  />
                </LinkedinShareButton>
                <Spacer />
              </Flex> */}
              <Flex width="100%">
                  <Spacer />
                  <WhatsappShareButton
                    url={url}
                    title="MEV technology for YCombinator"
                    blankTarget={true}
                  >
                    <Icon as={BsWhatsapp} color="#ffffff" fontSize="50" />
                  </WhatsappShareButton>
                  <Spacer />
                  <TwitterShareButton url={url} blankTarget={true}>
                    <Icon as={BsTwitter} color="#ffffff" fontSize="50" />
                  </TwitterShareButton>
                  <Spacer />
                  <EmailShareButton url={url}>
                    <Icon as={HiOutlineMail} color="#ffffff" fontSize="50" />
                  </EmailShareButton>
                  <Spacer />
                  <LinkedinShareButton url={url}>
                    <Icon as={BsLinkedin} color="#ffffff" fontSize="50" />
                  </LinkedinShareButton>
                  <Spacer />
                </Flex>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
