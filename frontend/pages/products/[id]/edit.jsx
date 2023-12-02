import { Flex } from "@chakra-ui/react";
import ProductForm from "@/components/products/ProductForm";

export default function EditProduct() {
  return (
    <>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <ProductForm isUpdate={true} />
      </Flex>
    </>
  );
}
