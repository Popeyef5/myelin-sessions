import { AspectRatio, Box } from "@chakra-ui/layout";

interface BannerProps {
  banner: string;
}

//TODO: load only first frame statically, get background video downloading after page already up
export const SessionBanner = ({ banner }: BannerProps) => {
  return (
    <>
      <AspectRatio
        position="absolute"
        width={{ base: "100%", lg: "100vh" }}
        top="0"
        right="0"
        ratio={1}
      >
        <Box height="100%" width="100%">
          <Box
            position="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            bg="rgba(0, 0, 0, 0.35)"
          />
          <video
            autoPlay
            muted
            loop
            src={banner}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
      </AspectRatio>
    </>
  );
};
