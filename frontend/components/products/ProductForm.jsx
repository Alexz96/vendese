import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Select,
  Skeleton,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

export default function ProductForm(props) {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const router = useRouter();
  const toast = useToast();
  const { id } = router.query;

  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (typeof id != "undefined") {
      const getProductData = async () => {
        try {
          setLoading(true);

          const res = await axios.get(`/products/${id}`);

          setName(res.data.name);
          setSku(res.data.sku);
          setDescription(res.data.description);
          setPrice(res.data.price);
          setCategoryId(res.data.category_id);

          setLoading(false);
        } catch (error) {
          console.log("Erro: ", error);
        }
      };

      getProductData();
    }

    getCategories();
  }, [id]);

  function goBack() {
    router.back();
  }

  async function submitProductForm() {
    try {
      setLoading(true);

      if (props.isUpdate) {
        await axios.put(`/products/${id}`, {
          name,
          sku,
          description,
          price,
          category_id: categoryId,
        });
      } else {
        await axios.post("/products", {
          name,
          sku,
          description,
          price,
          category_id: categoryId,
        });
      }

      toast({
        title: "Product saved",
        description: "Product saved successfully!",
        duration: 2500,
        position: "top-left",
        status: "success",
      });

      setLoading(false);
    } catch (error) {
      console.log(error.response.data);
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to save product",
        duration: 2500,
        position: "top-left",
        status: "error",
      });
    }
  }

  function getCategories() {
    axios
      .get("/products-category")
      .then((res) => {
        setCategoriesList(res.data);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "Error searching categories",
          status: "error",
          duration: 3000,
          position: "top-left",
        });
        console.log("Error: ", error);
      });
  }

  function renderCategories() {
    if (categoriesList.length > 0) {
      return categoriesList.map((category) => {
        return (
          <option key={category.id + "-" + category.name} value={category.id}>
            {category.name}
          </option>
        );
      });
    }
  }

  return (
    <>
      <Flex
        width="30vw"
        direction="column"
        background={formBackground}
        p={12}
        rounded={6}
      >
        <IconButton
          mb={6}
          icon={<ArrowBackIcon />}
          width={10}
          height={10}
          onClick={goBack}
        />

        <Heading mb={6}>
          {props.isUpdate ? "Update product" : "New product"}
        </Heading>

        <Skeleton isLoaded={!loading}>
          <Input
            placeholder="product name here"
            variant="filled"
            type="text"
            mb={3}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            placeholder="product code"
            variant="filled"
            type="text"
            mb={3}
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />

          <Textarea
            placeholder="product description here"
            variant="filled"
            mb={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            placeholder="product price"
            variant="filled"
            type="text"
            mb={3}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Select
            placeholder="select which category it belongs"
            variant="filled"
            mb={6}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {renderCategories()}
          </Select>
        </Skeleton>

        <Button mt={3} colorScheme="blue" onClick={submitProductForm}>
          Save
        </Button>
      </Flex>
    </>
  );
}
