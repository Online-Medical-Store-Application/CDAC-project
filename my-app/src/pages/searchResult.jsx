import { Link, useParams } from "react-router-dom";
import { getProductDetails } from "../services/product";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import config from "../config";
import medicine from "../medicine.jpg";

function SearchResult() {
  // const { propertyId } = useParams();
  // const [details, setDetails] = useState(undefined);

  // const loadProductDetails = async () => {
  //   const result = await getProductDetails(propertyId);
  //   if (result["status"] === "success") {
  //     const details = result["data"];

  //     setDetails(result["data"]);
  //     console.log(result["data"]);
  //   } else {
  //     toast.error(result["error"]);
  //   }
  // };

  // useEffect(() => {
  //   loadProductDetails();
  // }, []);

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
              <select id="filter" name="filter">
                <option value="" selected>
                  select
                </option>
                <option value="Featured">Featured</option>
                <option value="Price Low to High">Price Low to High</option>
                <option value="Price High to Low">Price High to Low</option>
              </select>
            </li>
            <li>
              <Link to="/manageProfiles">User</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <section class="search-result">
          <h2>Search Result</h2>
          <img src={medicine} alt="Medicine Image" class="search-result-image" />
          <h3>Medicine Name</h3>
          <p class="description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod est ac lorem aliquet scelerisque. Donec euismod est ac lorem aliquet scelerisque. Donec euismod est ac lorem aliquet
            scelerisque. Donec euismod est ac lorem aliquet scelerisque.
          </p>
          <div class="details">
            <p>
              <b>Price:</b> $10.00
            </p>
            <button>Add to Cart</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SearchResult;
