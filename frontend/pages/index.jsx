import {
  Button,
  Checkbox,
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

export default function Login() {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const router = useRouter();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  function goToRegisterPage() {
    router.push("/register");
  }

  const csrf = () => axios.get("http://localhost:8000/sanctum/csrf-cookie");

  async function submitLoginForm() {
    try {
      setLoading(true);

      await csrf();

      await axios.post("http://localhost:8000/login", {
        email,
        password,
        remember,
      });

      toast({
        title: "Success",
        description: "Logged in successfully!",
        position: "top-left",
        duration: 2500,
        status: "success",
      });

      setLoading(false);
      router.push("/home");
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: error.response.data.message,
        position: "top-left",
        duration: 2500,
        status: "error",
      });
      console.log("Error on submit sign up: ", error.response.data.message);
    }
  }

  return (
    <>
      <Head>
        <title>Vendese - Login</title>
        <meta name="description" content="Login page of Vendese" />
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
            <Heading mb={6}>Login</Heading>
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
            <Checkbox
              mb={6}
              justifyContent="center"
              value={remember}
              onChange={(e) => setRemember(!remember)}
            >
              Remember me
            </Checkbox>
            <Flex direction="row" justifyContent="space-evenly">
              <Button
                mb={6}
                colorScheme="teal"
                onClick={submitLoginForm}
                isLoading={loading}
              >
                Log in
              </Button>
              <Button mb={6} colorScheme="blue" onClick={goToRegisterPage}>
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
