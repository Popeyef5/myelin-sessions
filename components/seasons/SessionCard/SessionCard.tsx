import { AspectRatio, Box, Center, Spacer, Text } from "@chakra-ui/layout";
import Link from "next/link";
import Image from "next/image";
import { Episode, Institution, Speaker } from ".prisma/client";

interface SessionCardProps {
  session: Episode & { speakers?: (Speaker & { institution: Institution })[] };
}

export const SessionCard = ({ session }: SessionCardProps) => {
  return (
    <Link href={{ pathname: "/session/[id]", query: { id: session.slug } }}>
      <Box cursor="pointer">
        <AspectRatio
          width={{ base: "100%" }}
          top="0"
          right="0"
          ratio={1}
          borderRadius="30px 30px 0 0"
          overflow="hidden"
        >
          <Box height="100%" width="100%">
            {session.banner?.endsWith(".mp4") ? (
              <video
                autoPlay
                playsInline
                muted
                loop
                src={session.banner}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <Image src={session.banner || ""} layout="fill" alt="Sessiob banner"/>
            )}
            <Box
              position="absolute"
              top="0"
              right="0"
              bottom="0"
              left="0"
              bg="rgba(0, 0, 0, 0.30)"
              transform={{ base: "translate3d(0, 0, 1px)" }}
            />
            <Center
              position="absolute"
              w="100%"
              h="100%"
              bg="transparent"
              px="24px"
            >
              <Text fontSize="46px" fontWeight="700">
                {session.title}
              </Text>
            </Center>
          </Box>
        </AspectRatio>
        <Box
          borderRadius="0 0 30px 30px"
          bg="linear-gradient(to bottom, #ffffff1c,#ffffff0c)"
          padding="24px"
          display="flex"
          flexDir="column"
        >
          <Text noOfLines={3}>
            <>
              Speakers:{" "}
              {session.speakers?.length ? (
                session.speakers
                  .map(
                    (s) =>
                      s.name +
                      (s.institution ? " (" + s.institution.name + ")" : "")
                  )
                  .join(" & ")
              ) : (
                <>TBD
              <br />
              </>
              )}
              <br />
              <br />
            </>
          </Text>
          <Spacer/>
          <Text>
            <>Date: {session.date || "TBD"}</>
          </Text>
        </Box>
      </Box>
    </Link>
  );
};
