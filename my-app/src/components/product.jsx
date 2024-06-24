import { useDispatch } from "react-redux";
import { addToCartAction } from "../features/cartSlice";
import config from "../config";
import { useNavigate } from "react-router-dom";

function Product({ product }) {
  const getShortDetails = () => {
    return product.details.length > 50 ? product.details.substr(0, 50) + "..." : product.details;
  };

  // used to update the state
  const dispatch = useDispatch();

  const bookProduct = () => {
    dispatch(addToCartAction(product));
  };

  const navigate = useNavigate();
  const onProductClick = () => {
    navigate(`/product-details/${product.id}`);
  };

  return (
    <div onClick={onProductClick} className="col-3" style={{ display: "inline-block", cursor: "pointer", padding: 10 }}>
      <div className="card">
        <img style={{ height: 200 }} className="card-img-top" src={`${config.url}/image/${product.profileImage}`} alt="" />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <p className="card-text">{getShortDetails()}</p>
          <div style={{ fontWeight: 600 }}>₹ {product.rent} night</div>
          <button onClick={bookProduct} style={{ position: "absolute", right: 15, bottom: 15 }} className="btn btn-success">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
