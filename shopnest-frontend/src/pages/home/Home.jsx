import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import BannerCarousel from "../../components/BannerCarousel/BannerCarousel";
import FilterBar from "../../components/FilterBar/FilterBar";
import CategoryMenu from "../../components/CategoryMenu/CategoryMenu";
import ProductCard from "../../components/ProductCard/ProductCard";

import Styles from "./Home.module.css";
import {
  getProducts,
  getProductsByCategory,
} from "../../services/productService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const { category } = useParams();

  useEffect(() => {
    fetchProducts();
  }, [location.search, page, category]);

  const fetchProducts = async () => {
    try {
      const query = new URLSearchParams(location.search).get("search");
      const data = category
        ? await getProductsByCategory(category)
        : await getProducts(query, page);

      if (category) {
        setProducts(Array.isArray(data) ? data : []);
        setIsLastPage(true);
      } else {
        setProducts(Array.isArray(data?.products) ? data.products : []);
        setIsLastPage(Boolean(data?.isLastPage));
      }

      setError("");
    } catch (error) {
      setProducts([]);
      setIsLastPage(true);
      setError(error.message || "Unable to load products right now.");
    }
  };

  const normalizedProducts = Array.isArray(products) ? products : [];

  const visibleProducts = [...normalizedProducts].sort((firstProduct, secondProduct) => {
      if (sortOrder === "priceLow") {
        return firstProduct.discountedPrice - secondProduct.discountedPrice;
      }

      if (sortOrder === "priceHigh") {
        return secondProduct.discountedPrice - firstProduct.discountedPrice;
      }

      return 0;
    });

  return (
    <>
      <Navbar />

      <BannerCarousel />

      <CategoryMenu />

      <div className={Styles.container}>
        <FilterBar onSort={setSortOrder} />

        <div className={Styles.productGrid}>
          {error ? (
            <p>{error}</p>
          ) : visibleProducts.length > 0 ? (
            visibleProducts.map((p) => <ProductCard key={p.id} product={p} />)
          ) : (
            <p>No products found{category ? ` in ${category}` : ""}</p>
          )}
        </div>

        {/* Pagination */}
        {!location.search && !category && (
          <div style={{ marginTop: "30px", textAlign: "center" }}>
            <button onClick={() => setPage(page - 1)} disabled={page === 0}>
              Previous
            </button>

            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setPage(page + 1)}
              disabled={isLastPage}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
