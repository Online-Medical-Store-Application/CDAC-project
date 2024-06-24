import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../features/userSlice";

function Navbar() {
  // read the cart state
  const cart = useSelector((state) => state.cart);

  // get the navigate object
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onLogout = () => {
    // clear the session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("name");

    // set the login status to false
    dispatch(logoutAction());

    // navigate to login page
    navigate("/login");
  };

  return (
    <nav data-bs-theme="dark" className="navbar bg-dark navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Medico
        </a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/home" className="nav-link">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/add-product" className="nav-link">
                Add
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/cart" className="nav-link">
                Cart ({cart.items.length})
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" onClick={onLogout}>
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
