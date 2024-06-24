import CategoryList from "../components/categorylist";
import ProductList from "../components/productlist";

function Home() {
  return (
    <div>
      <h2 className="page-title">Medico</h2>

      <div>
        <CategoryList />
        <div className="mb-3 mt-3"></div>
        <ProductList />
      </div>
    </div>
  );
}

export default Home;
