import {
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";

axios.defaults.withCredentials = true;

export default function Register() {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  function goBack() {
    router.back();
  }

  const csrf = () => axios.get("http://localhost:8000/sanctum/csrf-cookie");

  async function submitRegisterForm() {
    try {
      setLoading(true);
      await csrf();

      await axios.post("http://localhost:8000/register", {
        name,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });

      toast({
        title: "Success",
        description: "Registered successfully!",
        position: "top-left",
        duration: 2500,
        status: "success",
      });
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, check console",
        position: "top-left",
        duration: 2500,
        status: "error",
      });

      setLoading(false);
      console.log("Error on submit sign up: ", error);
    }
  }

  return (
    <>
      <Head>
        <title>Vendese - Sign Up</title>
        <meta name="description" content="Signup page of Vendese" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex height="100vh" alignItems="center" justifyContent="center">
          <Flex
            direction="column"
            background={formBackground}
            p={12}
            rounded={6}
          >
            <Heading mb={6}>Sign Up</Heading>
            <Input
              placeholder="Jane Doe"
              variant="filled"
              mb={3}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="email@example.com"
              variant="filled"
              mb={3}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="******"
              variant="filled"
              mb={3}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="******"
              variant="filled"
              mb={6}
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
            <Flex direction="row" justifyContent="space-evenly">
              <Button mb={6} colorScheme="teal" onClick={goBack}>
                Back
              </Button>
              <Button
                mb={6}
                colorScheme="blue"
                onClick={submitRegisterForm}
                isLoading={loading}
              >
                Sign up
              </Button>
            </Flex>
            <Button onClick={toggleColorMode}>Toggle color mode</Button>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
