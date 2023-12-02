import { createContext, useEffect, useState } from "react";

const ShoppingCartContext = createContext({});

export function ShoppingCartProvider(props) {
  const [itemCount, setItemCount] = useState(0);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    setItemCount(itemList.length);
  }, [itemList]);

  function addItemToList(itemObject) {
    let list = itemList;
    list.push(itemObject);
    setItemList(list);
    setItemCount(itemCount + 1);
  }

  function removeItemFromList(index) {
    // console.log("Item List Before delete: ", itemList);
    // console.log("Index to remove: ", index);

    const newList = [...itemList];
    newList.splice(index, 1);
    // console.log("New list: ", newList);

    setItemList(newList);
    setItemCount(itemCount - 1);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        itemList,
        addItemToList,
        removeItemFromList,
        itemCount,
      }}
    >
      {props.children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartContext;
