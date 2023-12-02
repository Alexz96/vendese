import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Spacer,
  Tooltip,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Head from "next/head";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import ItemCard from "@/components/ItemCard";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "@/data/hooks/useCart";

axios.defaults.withCredentials = true;

export default function Home() {
  const { itemCount } = useCart();

  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const router = useRouter();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure(); // Drawer
  const btnRef = useRef();

  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);

  async function showCurrentUser() {
    try {
      const res = await axios.get("http://localhost:8000/api/user");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      setLoading(true);
      await axios.post("http://localhost:8000/logout");

      toast({
        title: "Success",
        description: "Logged out! See you soon",
        position: "top-left",
        duration: 2500,
        status: "warning",
      });

      setLoading(false);
      router.push("/");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong, check console",
        position: "top-left",
        duration: 2500,
        status: "error",
      });

      setLoading(false);
      console.log(error);
    }
  }

  function goToNewCategory() {
    router.push("/products/category/");
  }

  function goToProductPage() {
    router.push("/products");
  }

  function renderProducts() {
    if (typeof products != "undefined") {
      if (products.length > 0) {
        return products.map((product) => {
          return (
            <ItemCard product={product} key={`${product.id}`} />
          );
        });
      }
    }
  }

  function goToCartPage() {
    router.push("/cart");
  }

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/products")
      .then((res) => setProducts(res.data))
      .catch((error) =>
        toast({
          title: "Error",
          description: "Failed searching products",
          duration: 3000,
          position: "top-left",
          status: "error",
        })
      );
  }, []);

  return (
    <>
      <Head>
        <title>Vendese - Home</title>
        <meta name="description" content="Homepage of Vendese" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex direction="column">
          <Flex
            background={formBackground}
            width="full"
            height="10vh"
            rounded={6}
          >
            <Spacer />
            <Button mr={6} mt={6} onClick={toggleColorMode}>
              Toggle color mode
            </Button>
            <Button
              mr={6}
              mt={6}
              ref={btnRef}
              colorScheme="teal"
              onClick={onOpen}
            >
              Open menu
            </Button>

            <Tooltip hasArrow label={`Items in cart: ${itemCount}`} size="xl">
              <IconButton
                mt={6}
                mr={12}
                icon={<FiShoppingCart color={formBackground} />}
                _hover={{ background: "teal" }}
                onClick={goToCartPage}
              />
            </Tooltip>
          </Flex>

          <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
            <DrawerOverlay />

            <DrawerContent>
              <DrawerCloseButton />

              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <Flex direction="column" gap={6}>
                  <Button colorScheme="blue" onClick={goToNewCategory}>
                    New category
                  </Button>
                  <Button colorScheme="blue" onClick={goToProductPage}>
                    New product
                  </Button>
                </Flex>
              </DrawerBody>

              <DrawerFooter>
                <Button mr={4} colorScheme="teal" onClick={showCurrentUser}>
                  Who is logged in?
                </Button>
                <Button colorScheme="red" onClick={logout} isLoading={loading}>
                  Logout
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {renderProducts()}
        </Flex>
      </main>
    </>
  );
}
