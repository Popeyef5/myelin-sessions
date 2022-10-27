import Icon from "@chakra-ui/icon";
import { Flex, Grid, Heading, Spacer, Text, VStack } from "@chakra-ui/layout";
import { BsArrowUpLeft } from "react-icons/bs";
import Link from "next/link";
import { Input } from "@chakra-ui/input";
import { Button, Textarea } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { User } from ".prisma/client";

const Profile = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  const [name, setName] = useState(session?.user.name || null);
  const [company, setCompany] = useState(session?.user.company || null);
  const [role, setRole] = useState(session?.user.role || null);
  const [twitter, setTwitter] = useState(session?.user.twitter || null);
  const [github, setGithub] = useState(session?.user.github || null);
  const [linkedin, setLinkedin] = useState(session?.user.linkedin || null);
  const [other, setOther] = useState(session?.user.other || null);

  const [savableChanges, setSavableChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setSavableChanges(
      name !== session?.user.name ||
        company !== session?.user.company ||
        role !== session?.user.role ||
        twitter !== session?.user.twitter ||
        github !== session?.user.github ||
        linkedin !== session?.user.linkedin ||
        other !== session?.user.other
    );
  }, [name, company, role, twitter, github, linkedin, other, session?.user]);

  const updateData = async () => {
    if (!session || !savableChanges) return;
    try {
      const body = {
        name,
        company,
        role,
        twitter,
        github,
        linkedin,
        other,
      };
      setIsSaving(true);
      await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, user: session?.user.id }),
      }).then(() => {
        setIsSaving(false);
      });
      session.user = {
        ...session.user,
        ...body,
      };
    } catch (error) {
      await router.push("/error");
    }
  };

  if (status === "loading") {
    return <></>;
  }

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
        elegibility for each session. Fill in as many as you think are
        necessary. You can update as many times as you like.
      </Text>
      <Spacer />
      {/* <Grid templateColumns="repeat(2, 1fr)"> */}
      <Grid templateColumns="150px 500px" rowGap="20px" alignItems="center">
        <Text variant="profile">name:</Text>
        <Input onChange={(e) => setName(e.target.value)} value={name || ""} />
        <Text variant="profile">company:</Text>
        <Input onChange={(e) => setCompany(e.target.value)} value={company || ""} />
        <Text variant="profile">role:</Text>
        <Input onChange={(e) => setRole(e.target.value)} value={role || ""} />
        <Text variant="profile">twitter:</Text>
        <Input onChange={(e) => setTwitter(e.target.value)} value={twitter || ""} />
        <Text variant="profile">github:</Text>
        <Input onChange={(e) => setGithub(e.target.value)} value={github || ""} />
        <Text variant="profile">linkedin:</Text>
        <Input onChange={(e) => setLinkedin(e.target.value)} value={linkedin || ""} />
        <Text variant="profile">other:</Text>
        <Input onChange={(e) => setOther(e.target.value)} value={other || ""} />
        {/* </Grid>
	<VStack align="start" gap="20px">
	 <Text variant="profile">What's the coolest thing you've built/learned/done?</Text>
	 <Textarea rows={4}/>
	 <Text variant="profile">What do you expect to get out of the Sessions?</Text>
	 <Textarea rows={4}/>
	</VStack> */}
      </Grid>
      <Spacer />
      <Button
        px="25px"
        py={{ base: "25px", lg: "30px" }}
        bg="white"
        width="fit-content"
        minW="200px"
        isDisabled={!savableChanges}
        isLoading={isSaving}
        onClick={updateData}
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
