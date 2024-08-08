import { useState } from "react";
import { addProduct } from "../services/product";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function AddProduct() {
  const [Image, setImage] = useState("");
  const [ProductName, setProductName] = useState("");
  const [Description, setDescription] = useState("");
  const [Price, setPrice] = useState("");
  const [Stock, setStock] = useState("");

  const navigate = useNavigate();

  const addNewProduct = async () => {
    const result = await addProduct(Image, ProductName, Description, Price, Stock);
    console.log(result);

    if (result["status"] == "success") {
      toast.success("Successfully added a product");
      navigate("/home");
    } else {
      toast.error(result["error"]);
    }
  };

  return (
    <div>
      <header>
        <Link to="/home">
          <h2>Medico</h2>
        </Link>
        <nav>
          <ul>
            <li>
              <Link to="/login">Logout</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/manageProfiles">User</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div class="admin-container">
        <h2>Add New Product</h2>
        <label for="image">Product Image:</label>
        <input
          onChange={(e) => {
            setImage(e.target.value);
          }}
          type="file"
          id="image"
          name="image"
          required
        />

        <label for="name">Product Name:</label>
        <input
          onChange={(e) => {
            setProductName(e.target.value);
          }}
          type="text"
          id="name"
          name="name"
          required
        />

        <label for="description">Description:</label>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          id="description"
          name="description"
          required
        ></textarea>

        <label for="price">Price:</label>
        <input
          onChange={(e) => {
            setPrice(e.target.value);
          }}
          type="number"
          id="price"
          name="price"
          required
        />

        <label for="stock">Stock Status:</label>
        <select
          id="stock"
          name="stock"
          required
          onChange={(e) => {
            setStock(e.target.value);
          }}
        >
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <button onClick={addNewProduct} className="btn btn-success">
          Add Product
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
