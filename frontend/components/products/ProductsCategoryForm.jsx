import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Skeleton,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";

axios.defaults.withCredentials = true;

export default function ProductsCategoryForm(props) {
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const toast = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setDescription(inputValue);
  };

  async function handleSubmit() {
    try {
      setLoading(true);

      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      if (props.isUpdate) {
        await axios.put(
          `http://localhost:8000/api/products-category/${props.category.id}`,
          {
            name,
            description,
          }
        );
        // console.log("success adding category: ", res.data);
      } else {
        await axios.post("http://localhost:8000/api/products-category", {
          name,
          description,
        });
        // console.log("success adding category: ", res.data);
      }

      toast({
        title: "Success",
        description: "Successfully created a new category",
        position: "top-right",
        duration: 2500,
        status: "success",
      });

      setName("");
      setDescription("");
      setLoading(false);
    } catch (error) {
      console.error("Error adding category: ", error.response.data);
      toast({
        title: "Error",
        description: "Something went wrong, check console",
        position: "top-right",
        duration: 2500,
        status: "error",
      });
      setLoading(false);
    }
  }

  function goBack() {
    router.back();
  }

  useEffect(() => {
    if (props.isUpdate) {
      if (typeof props.category != "undefined") {
        setName(props.category.name);
        setDescription(props.category.description);
      }
    }
  }, [props]);

  return (
    <>
      <Flex
        width="30vw"
        direction="column"
        background={formBackground}
        p={12}
        rounded={6}
      >
        <Skeleton isLoaded={!loading}>
          <IconButton
            mb={6}
            icon={<ArrowBackIcon />}
            width={10}
            height={10}
            onClick={goBack}
          />

          <Heading mb={6}>
            {props.isUpdate ? "Edit category" : "New category"}
          </Heading>

          <Input
            placeholder="category name"
            variant="filled"
            mb={3}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            variant="filled"
            mb={6}
            value={description}
            onChange={handleInputChange}
            placeholder="some description of the category"
            size="md"
            resize="vertical"
          />
        </Skeleton>
        <Button mt={3} colorScheme="blue" onClick={handleSubmit}>
          {props.isUpdate ? "Update" : "Create"}
        </Button>
      </Flex>
    </>
  );
}
