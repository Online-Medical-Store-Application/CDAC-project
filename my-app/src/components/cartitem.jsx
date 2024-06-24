import { useDispatch } from "react-redux";
import { removeFromCartAction } from "../features/cartSlice";
import config from "../config";

function CartItem({ product }) {
  const getShortDetails = () => {
    return product.details.length > 50 ? product.details.substr(0, 50) + "..." : product.details;
  };

  // used to update the state
  const dispatch = useDispatch();

  const cancelBooking = () => {
    dispatch(removeFromCartAction(product));
  };

  return (
    <div className="col-3" style={{ display: "inline-block", padding: 10 }}>
      <div className="card">
        <img style={{ height: 200 }} className="card-img-top" src={`${config.url}/image/${product.profileImage}`} alt="" />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{getShortDetails()}</p>
          <div style={{ fontWeight: 600 }}>₹ {product.rent} night</div>
          <button onClick={cancelBooking} style={{ position: "absolute", right: 15, bottom: 15 }} className="btn btn-danger">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
