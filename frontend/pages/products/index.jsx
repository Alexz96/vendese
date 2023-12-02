import ProductForm from "@/components/products/ProductForm";
import { Flex } from "@chakra-ui/react";

export default function Products() {
  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <ProductForm />
      </Flex>
    </>
  );
}
