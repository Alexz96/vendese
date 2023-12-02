import {
  Flex,
  Card,
  CardHeader,
  Heading,
  CardBody,
  CardFooter,
  Link,
  IconButton,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { EditIcon } from "@chakra-ui/icons";
import { FiShoppingCart } from "react-icons/fi";
import useCart from "@/data/hooks/useCart";

export default function ItemCard(props) {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const { product } = props;

  const { addItemToList } = useCart();

  function addProductToCart() {
    addItemToList(product);
  }

  return (
    <>
      <Card mt={6} mx={6}>
        <CardHeader>
          <Heading size="md">{product.name}</Heading>
        </CardHeader>
        <CardBody>{product.description}</CardBody>
        <CardFooter>
          R$ {product.price} <Spacer />
          <Flex direction="row" gap={3}>
            <Link as={NextLink} href={`/products/${product.id}/edit`}>
              <IconButton icon={<EditIcon />} />
            </Link>
            <IconButton
              icon={<FiShoppingCart color={formBackground} />}
              _hover={{ background: "teal" }}
              onClick={addProductToCart}
            />
          </Flex>
        </CardFooter>
      </Card>
    </>
  );
}
