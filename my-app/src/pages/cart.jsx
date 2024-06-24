import { useSelector } from "react-redux";
import CartItem from "../components/cartitem";
import { Link } from "react-router-dom";

function Cart() {
  // read cart items from state
  const cart = useSelector((state) => state.cart);

  return (
    <div>
      <h2 className="page-title">Cart</h2>
      <Link to={"/checkout"} className="btn btn-primary">
        Checkout
      </Link>
      <div>
        {cart.items.length > 0 &&
          cart.items.map((item) => {
            return <CartItem product={item} />;
          })}

        {cart.items.length == 0 && <h4 className="page-title">There no properties added to cart</h4>}
      </div>
    </div>
  );
}

export default Cart;
