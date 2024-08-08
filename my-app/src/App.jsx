import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import LoginUser from "./pages/Login";
import RegisterUser from "./pages/Register";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar";
import Cart from "./pages/cart";
import AddProduct from "./pages/addProduct";
import ProductDetails from "./pages/productDetails";
import Checkout from "./pages/checkout";
import { useSelector } from "react-redux";
import ManageProfiles from "./pages/manageprofiles";
import SearchResult from "./pages/searchResult";
function App() {
  const user = useSelector((state) => state.user);

  return (
    <div className="container-fluid">
      {/* if user is logged in then only render the navbar */}
      {user.loginStatus && <Navbar />}

      <div className="container">
        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path="/manageProfiles" element={<ManageProfiles />} />
          <Route path="/SearchResult" element={<SearchResult />} />
        </Routes>

        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
