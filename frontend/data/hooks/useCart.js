import { useContext } from "react";
import ShoppingCartContext from "../context/ShoppingCartContext";

const useCart = () => useContext(ShoppingCartContext);

export default useCart;
