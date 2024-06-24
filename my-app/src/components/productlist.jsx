import { useEffect, useState } from "react";
import { getProperties } from "../services/product";
import { toast } from "react-toastify";
import product from "./product";

function ProductList() {
  const [properties, setProperties] = useState([]);

  const loadProperties = async () => {
    const result = await getProperties();
    if (result["status"] === "success") {
      setProperties(result["data"]);
    } else {
      toast.error(result["error"]);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return (
    <div>
      {properties.map((product) => {
        return <product product={product} />;
      })}
    </div>
  );
}

export default ProductList;
