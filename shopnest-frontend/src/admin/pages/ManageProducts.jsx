import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import api from "../../Api/axiosConfig";
import Styles from "../styles/Admin.module.css";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products");

      setProducts(res.data);
      setError("");
    } catch (error) {
      console.error("Fetch error:", error);

      if (error.response?.status === 403) {
        alert("Access denied. Please login again.");
      }

      setError("Failed to load products.");
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/admin/product/${id}`);

      alert("Product deleted");

      fetchProducts();
    } catch (error) {
      console.error("Delete error:", error);
      alert(
        error.response?.data ||
          "Failed to delete product. It may still be linked to an order.",
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className={Styles.pageHeader}>
        <h2>Manage Products</h2>
        <p className={Styles.muted}>
          Review inventory and remove outdated listings.
        </p>
      </div>

      {error && <p className={Styles.error}>{error}</p>}

      <div className={Styles.panel}>
        {products.length === 0 ? (
          <p className={Styles.muted}>No products found.</p>
        ) : (
          <table className={Styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discounted Price</th>
                <th>Discount</th>
                <th>Stock</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>#{p.id}</td>

                  <td>{p.name}</td>

                  <td>₹{p.price}</td>

                  <td>₹{p.discountedPrice}</td>

                  <td>{p.discount}%</td>

                  <td>{p.stock}</td>

                  <td>
                    <img
                      src={`http://localhost:8080${p.imageUrl}`}
                      width="60"
                      alt={p.name}
                    />
                  </td>

                  <td>
                    <div className={Styles.actionGroup}>
                      <Link
                        to={`/admin/edit-product/${p.id}`}
                        className={`${Styles.button} ${Styles.primaryButton}`}
                      >
                        Edit
                      </Link>

                      <button
                        className={`${Styles.button} ${Styles.successButton}`}
                        onClick={() => deleteProduct(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default ManageProducts;
