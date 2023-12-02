import useCart from "@/data/hooks/useCart";
import { ArrowBackIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  IconButton,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function CartPage(props) {
  const background = useColorModeValue("gray.100", "gray.700");
  const { itemList, removeItemFromList, itemCount } = useCart();
  const router = useRouter();

  function renderProducts() {
    return itemList.map((item, i) => {
      return (
        <Tr key={`${item.id}+ati-${i}`}>
          <Th>{item.name}</Th>
          <Th>{item.sku}</Th>
          <Th>{item.price}</Th>
          <Th>
            <IconButton
              icon={<DeleteIcon />}
              onClick={() => removeItemFromList(i)}
              _hover={{
                background: "tomato",
                color: "white",
              }}
            />
          </Th>
        </Tr>
      );
    });
  }

  return (
    <>
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        direction="column"
        gap={6}
      >
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={router.back}
          size="lg"
          mt={6}
        />

        <Flex
          background={background}
          height="90%"
          width="95%"
          rounded="xl"
          direction="column"
        >
          {itemCount > 0 ? (
            <TableContainer>
              <Table variant="striped">
                <Thead>
                  <Tr>
                    <Th>My cart</Th>
                  </Tr>
                  <Tr>
                    <Th>Product name</Th>
                    <Th>SKU</Th>
                    <Th>Price</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>

                <Tbody>{renderProducts()}</Tbody>
              </Table>
            </TableContainer>
          ) : (
            <>
              <Center height="100%">
                <Heading>No items in your cart</Heading>
              </Center>
              <Center>
                <Heading as="h4" size="md">
                  Try adding some products from our homepage
                </Heading>
              </Center>
            </>
          )}

          <Spacer />

          <Divider />
          <Heading mt={6} mb={6} ml={3}>
            Subtotal
          </Heading>
        </Flex>

        <Flex direction="row" justifyContent="end" width="100%" mr={20}>
          <Button colorScheme="blue">Place order</Button>
        </Flex>
      </Flex>
    </>
  );
}
