import { Button, IconButton } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Center, Text, VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ChangeEventHandler, useEffect, useState } from "react";
import { FaEnvelope, FaGithub, FaGoogle, FaTwitter } from "react-icons/fa";
import { IoMdClose, IoMdCheckmark } from "react-icons/io";

export type SignInErrorTypes = "OAuthAccountNotLinked" | "default";

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [called, setCalled] = useState("");
  const [email, setEmail] = useState("");
  const [openEmail, setOpenEmail] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const toast = useToast();

  const errors: Record<SignInErrorTypes, string> = {
    OAuthAccountNotLinked:
      "You already signed up using another provider. Please use the same one or sign in using email.",
    default:
      "An error ocurred. If it persists, please contact us at sessions@myelin.vc.",
  };

  const errorType: SignInErrorTypes | undefined = router.query.error
    ? router.query.error === "OAuthAccountNotLinked"
      ? router.query.error
      : "default"
    : undefined;

  const error = errorType && (errors[errorType] ?? errors.default);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error.",
        description: error,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error]);
  if (status === "authenticated") {
    router.push("/");
    return <></>;
  }

  const signInWith = (provider: string) => {
    if (called) return;
    setCalled(provider);
    if (provider !== "email") {
      signIn(provider);
    } else {
      signIn(provider, { callbackUrl: "/seasons", email });
    }
  };

  const checkEmail: ChangeEventHandler<HTMLInputElement> = (event) => {
    const email = event.target.value;
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setEmail(email);

    if (re.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  return (
    <Center flexGrow="1">
      <VStack>
        {openEmail ? (
          <InputGroup size="md">
            <Input
              placeholder="Enter mail"
              type="email"
              w="250px"
              paddingEnd="100px"
              onChange={checkEmail}
            />
            <InputRightElement width="4.5rem" marginEnd="0.75rem" gap="5px">
              <IconButton
                aria-label="send link"
                h="1.75rem"
                bg="green"
                color="white"
                icon={<IoMdCheckmark />}
                onClick={() => signInWith("email")}
                isDisabled={!emailValid || called !== ""}
                isLoading={called === "email"}
              />
              <IconButton
                aria-label="close"
                h="1.75rem"
                bg="red"
                color="white"
                icon={<IoMdClose />}
                onClick={() => setOpenEmail(false)}
                isDisabled={called !== ""}
              />
            </InputRightElement>
          </InputGroup>
        ) : (
          <Button
            w="250px"
            leftIcon={<FaEnvelope />}
            onClick={() => setOpenEmail(true)}
          >
            &nbsp;Email&nbsp;&nbsp;
          </Button>
        )}
        <Button
          w="250px"
          colorScheme="red"
          leftIcon={<FaGoogle />}
          onClick={() => signInWith("google")}
          isLoading={called === "google"}
        >
          Google
        </Button>
        <Button
          w="250px"
          colorScheme="blackAlpha"
          border="1px solid white"
          leftIcon={<FaGithub />}
          onClick={() => signInWith("github")}
          isLoading={called === "github"}
        >
          Github
        </Button>
        {/* <Button
          w="250px"
          colorScheme="twitter"
          leftIcon={<FaTwitter />}
          onClick={() => signInWith("twitter")}
          isLoading={called === "twitter"}
        >
          Twitter
        </Button> */}
      </VStack>
    </Center>
  );
};

export default Login;
