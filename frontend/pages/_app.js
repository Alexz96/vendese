import { ChakraProvider } from "@chakra-ui/react";
import { ShoppingCartProvider } from "@/data/context/ShoppingCartContext";

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ShoppingCartProvider>
        <Component {...pageProps} />
      </ShoppingCartProvider>
    </ChakraProvider>
  );
}
