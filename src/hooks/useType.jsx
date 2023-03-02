import { useEffect, useState } from "react";

const useType = (cards) => {
  const [newTypes, setNewTypes] = useState([]);
  useEffect(() => {
    const newTypes = [];
    cards.map((value, index) => {
      console.log(value.type);
      newTypes.push(value.type);
    });
    //console.log(newTypes);
    setNewTypes(newTypes);
  }, [cards]);

  return { newTypes };
};

export default useType;
