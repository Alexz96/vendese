import ProductsCategoryForm from "@/components/products/ProductsCategoryForm";
import { Flex } from "@chakra-ui/react";

export default function NewCategory() {
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <ProductsCategoryForm />
    </Flex>
  );
}
