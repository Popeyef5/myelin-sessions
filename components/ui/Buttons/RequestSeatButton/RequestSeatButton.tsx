import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Center, HStack, Text } from "@chakra-ui/layout";
import { useSession } from "next-auth/react";
import { MdAddCircleOutline } from "react-icons/md";
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
import { isProfileEmpty } from "../../../../lib/util";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Application, Episode } from ".prisma/client";
import { AppContext } from "../../../../pages/_app";

interface RequestSeatButtonProps {
  episode: Episode;
}

export const RequestSeatButton = ({ episode }: RequestSeatButtonProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();
  const router = useRouter();

  const { applications, setApplications } = useContext(AppContext);

  const [isRegistered, setIsRegistered] = useState(
    applications.length > 0 &&
      status === "authenticated" &&
      applications.map((a) => a.userId).includes(session!.user.id)
  );

  useEffect(() => {
    setIsRegistered(
      applications.length > 0 &&
        status === "authenticated" &&
        applications.map((a) => a.userId).includes(session!.user.id)
    );
  }, [applications, status]);

  const [isSending, setIsSending] = useState(false);

  const requestSeat = async () => {
    if (!session) return;
    try {
      const body = {
        userId: session.user.id,
        episodeId: episode.id,
      };
      setIsSending(true);
      const response = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        await router.push("/error");
      }

      const newApplication: Application = await response.json();
      setApplications([...applications, newApplication]);

      setIsSending(false);
      setIsRegistered(true);
    } catch (error) {
      await router.push("/error");
    }
  };

  const conditionalRequest = () => {
    if (!session) return;
    if (isProfileEmpty(session.user)) {
      onOpen();
    } else {
      requestSeat();
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
          onClick={conditionalRequest}
          isDisabled={session === null || isRegistered}
          isLoading={isSending}
        >
          {session ? (
            isRegistered ? (
              <Text color="black" fontSize={{ base: "15", lg: "20" }}>
                Seat requested
              </Text>
            ) : (
              <HStack>
                <Icon as={MdAddCircleOutline} color="black" fontSize="20" />
                <Text color="black" fontSize={{ base: "15", lg: "20" }}>
                  Request Seat
                </Text>
              </HStack>
            )
          ) : (
            <Text color="black" fontSize={{ base: "15", lg: "20" }}>
              Log in to request seat
            </Text>
          )}
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} isCentered>
          <ModalOverlay />
          <ModalContent bg="#000f14" border="2px solid white">
            <ModalBody padding="25px">
              <Text>
                Your profile data is empty. As seats are limited, we&apos;ll
                choose the attendees based on the information provided to us.
                You can apply anyways and update your data later or you can fill
                the information first.
              </Text>
            </ModalBody>

            <ModalFooter justifyContent="space-between">
              <Button
                bg="#00dcda"
                color="white"
                mr={3}
                onClick={() => {
                  onClose();
                  requestSeat();
                }}
              >
                Request anyways
              </Button>
              <Button
                onClick={() => {
                  router.push("/profile");
                }}
              >
                {" "}
                Fill profile{" "}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
    </>
  );
};
