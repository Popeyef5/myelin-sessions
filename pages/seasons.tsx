import Icon from "@chakra-ui/icon";
import { Grid, HStack, Text, VStack } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { SessionCard } from "../components/seasons/SessionCard";

import seasons from "../json/seasons.json";

const Seasons = () => {
  const [season, setSeason] = useState(seasons[0]);

  return (
    <VStack align="left" px="100px" gap="100px" py="50px">
      <Text fontSize="30px">
        Season:{" "}
        <Menu isLazy autoSelect={false}>
          <MenuButton>{season.title}{" "}<Icon as={FiChevronDown} fontSize="22px"/></MenuButton>
	  <MenuList bg="#000f14">
	    {seasons.map(season => <MenuItem isDisabled={season.sessions === undefined} _focus={{bg: "#000f14"}} _active={{bg: "#000f14"}}>{season.title}</MenuItem>)}
	  </MenuList>
        </Menu>
      </Text>
      <Grid templateColumns={{ base: `repeat(4, 1fr)` }} gap="50px">
        {season.sessions?.map((session) => (
          <SessionCard session={session} />
        ))}
      </Grid>
    </VStack>
  );
};

export default Seasons;
