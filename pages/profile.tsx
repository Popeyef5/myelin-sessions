import Icon from "@chakra-ui/icon";
import { Flex, Grid, Heading, Spacer, Text, VStack } from "@chakra-ui/layout";
import { BsArrowUpLeft } from "react-icons/bs";
import Link from "next/link";
import { Input } from "@chakra-ui/input";
import { Button, Textarea } from "@chakra-ui/react";

const Profile = () => {
  return (
    <Flex flexDir="column" px="100px" flexGrow="1" py="30px">
      <Link href="/seasons">
        <Icon
          as={BsArrowUpLeft}
          color="white"
          fontSize="50"
          zIndex="5"
          cursor="pointer"
        />
      </Link>
      <Heading fontSize="80px" paddingTop="20px">
        Profile
      </Heading>
      <Text fontWeight="100" fontSize="20px">
        None of these fields are mandatory, but they do help determine
        elegibility for each session. Fill in as many as you think are necessary. You can update as many times as you like.
      </Text>
      <Spacer />
      <Grid templateColumns="repeat(2, 1fr)">
        <Grid templateColumns="150px 500px" rowGap="20px" alignItems="center">
          <Text variant="profile">name:</Text>
          <Input />
          <Text variant="profile">company:</Text>
          <Input />
          <Text variant="profile">role:</Text>
          <Input />
          <Text variant="profile">twitter:</Text>
          <Input />
          <Text variant="profile">github:</Text>
          <Input />
          <Text variant="profile">linkedin:</Text>
          <Input />
          <Text variant="profile">other:</Text>
          <Input />
        </Grid>
	<VStack align="start" gap="20px">
	 <Text variant="profile">What's the coolest thing you've built/learned/done?</Text>
	 <Textarea size="md"/>
	 <Text variant="profile">What do you expect to get out of the Sessions?</Text>
	 <Textarea size="md"/>
	</VStack>
      </Grid>
      <Spacer />
      <Button
        px="25px"
        py={{ base: "25px", lg: "30px" }}
        bg="white"
        width="fit-content"
        minW="200px"
        isDisabled
      >
        <Text color="black" fontSize={{ base: "15", lg: "20" }}>
          Save
        </Text>
      </Button>
      <Spacer />
    </Flex>
  );
};

export default Profile;
