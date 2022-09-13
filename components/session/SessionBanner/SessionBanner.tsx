import { Box } from "@chakra-ui/layout";
import Image, { StaticImageData } from "next/image";
import banner2 from "../../../public/0/future.png"

interface BannerProps {
  banner: string | StaticImageData;
}

export const SessionBanner = ({ banner }: BannerProps) => {
  return (
    <Box w="100%" h="45vh" overflow="hidden" position="relative">
      <Image src={banner} width="100%" height="200" layout="fill" objectFit="cover"/>
    </Box>
  );
};
