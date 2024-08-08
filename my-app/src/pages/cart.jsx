import { useSelector } from "react-redux";
import CartItem from "../components/cartitem";
import { Link } from "react-router-dom";
import medicine from "../medicine.jpg";

function Cart() {
  // read cart items from state
  const cart = useSelector((state) => state.cart);

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
              <Link to="/manageProfiles">User</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div class="cart-container">
        <h2>Shopping Cart</h2>
        <div class="cart-items">
          <div class="cart-item">
            <img src={medicine} alt="Product 1" />
            <div class="item-details">
              <h3>Product 1</h3>
              <p>Description of product 1</p>
              <span class="price">₹ 1,000</span>
              <button class="remove-btn">Remove</button>
            </div>
          </div>
          <div class="cart-item">
            <img src={medicine} alt="Product 1" />
            <div class="item-details">
              <h3>Product 2</h3>
              <p>Description of product 2</p>
              <span class="price">₹ 5,000</span>
              <button class="remove-btn">Remove</button>
            </div>
          </div>
        </div>
        <div class="cart-total">
          <p>
            Subtotal: <span class="subtotal-price">₹ 6,000</span>
          </p>
          <Link to={"/checkout"} className="btn btn-primary">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
