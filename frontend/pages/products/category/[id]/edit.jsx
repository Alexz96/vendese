import ProductsCategoryForm from "@/components/products/ProductsCategoryForm";
import { Flex } from "@chakra-ui/react";
import useAxios from "@/hooks/fetch";
import { useRouter } from "next/router";

export default function EditCategory() {
  const router = useRouter();
  const id = router.query.id;
  const { data } = useAxios(
    `http://localhost:8000/api/products-category/${id}`
  );

  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <ProductsCategoryForm isUpdate={true} category={data} />
    </Flex>
  );
}
