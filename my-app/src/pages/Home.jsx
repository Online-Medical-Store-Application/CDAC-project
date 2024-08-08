import CategoryList from "../components/categorylist";
import ProductList from "../components/productlist";
import medicine from "../medicine.jpg";
import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      {/* <h2 className="page-title">Medico</h2> */}

      {/* <div>
        <CategoryList />
        <div className="mb-3 mt-3"></div>
        <ProductList />
      </div> */}
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
      <div class="container">
        <div>
          <section class="search-bar">
            <form action="#">
              <input type="text" id="search-term" placeholder="Search for medicines" />
              <Link to={"/SearchResult"} class="search-bar button">
                Search
              </Link>
            </form>
          </section>
        </div>
        <nav>
          <ul>
            <button>Category1</button>
            <button>Category2</button>
            <button>Category3</button>
            <button>Category4</button>
            <button>Category5</button>
          </ul>
        </nav>
        <div class="container">
          <div class="product-grid">
            <div class="product-card">
              <Link to="/productDetails">
                <img src={medicine} alt="Product 1" />
              </Link>

              <h3>Product 1</h3>
              <p>Description of product 1</p>
              <button>
                <Link to="/add-product">Add to Cart</Link>
              </button>
            </div>
            <div class="product-card">
              <img src={medicine} alt="Product 2" />
              <h3>Product 2</h3>
              <p>Description of product 2</p>
              <button>Add to Cart</button>
            </div>
            <div class="product-card">
              <img src={medicine} alt="Product 3" />
              <h3>Product 3</h3>
              <p>Description of product 3</p>
              <button>Add to Cart</button>
            </div>
            <div class="product-card">
              <img src={medicine} alt="Product 4" />
              <h3>Product 4</h3>
              <p>Description of product 4</p>
              <button>Add to Cart</button>
            </div>
            <div class="product-card">
              <img src={medicine} alt="Product 5" />
              <h3>Product 5</h3>
              <p>Description of product 5</p>
              <button>Add to Cart</button>
            </div>
            <div class="product-card">
              <img src={medicine} alt="Product 6" />
              <h3>Product 6</h3>
              <p>Description of product 6</p>
              <button>Add to Cart</button>
            </div>
            <div class="product-card">
              <img src={medicine} alt="Product 7" />
              <h3>Product 7</h3>
              <p>Description of product 7</p>
              <button>Add to Cart</button>
            </div>
            <div class="product-card">
              <img src={medicine} alt="Product 8" />
              <h3>Product 8</h3>
              <p>Description of product 8</p>
              <button>Add to Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
