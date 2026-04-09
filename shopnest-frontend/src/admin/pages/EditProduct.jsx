import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import api from "../../api/axiosConfig";
import Styles from "../styles/Admin.module.css";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    discountedPrice: "",
    category: "",
    stock: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/admin/product/${id}`);
      setProduct({
        name: res.data.name || "",
        description: res.data.description || "",
        price: res.data.price || "",
        discount: res.data.discount || "",
        discountedPrice: res.data.discountedPrice || "",
        category: res.data.category || "",
        stock: res.data.stock || "",
        imageUrl: res.data.imageUrl || "",
      });
      setError("");
    } catch (error) {
      console.log(error);
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedProduct = {
      ...product,
      [name]: value,
    };

    if (name === "price" || name === "discount") {
      const price = Number(name === "price" ? value : product.price);
      const discount = Number(name === "discount" ? value : product.discount || 0);

      if (price > 0) {
        updatedProduct.discountedPrice = Math.round(
          price - (price * discount) / 100,
        );
      } else {
        updatedProduct.discountedPrice = "";
      }
    }

    setProduct(updatedProduct);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedName = product.name.trim();
    const trimmedDescription = product.description.trim();
    const trimmedCategory = product.category.trim().toLowerCase();
    const price = Number(product.price);
    const discount = Number(product.discount || 0);
    const stock = Number(product.stock);

    if (!trimmedName) {
      alert("Enter product name");
      return;
    }

    if (!trimmedCategory) {
      alert("Enter product category");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      alert("Enter a valid price greater than 0");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      alert("Enter a valid stock value");
      return;
    }

    if (!Number.isFinite(discount) || discount < 0 || discount > 90) {
      alert("Discount must be between 0 and 90");
      return;
    }

    try {
      await api.put(`/admin/product/${id}`, {
        name: trimmedName,
        description: trimmedDescription,
        price,
        discount,
        discountedPrice: Math.round(price - (price * discount) / 100),
        category: trimmedCategory,
        stock,
        imageUrl: product.imageUrl,
      });

      alert("Product Updated");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      alert(error.response?.data || "Failed to update product");
    }
  };

  return (
    <AdminLayout>
      <div className={Styles.pageHeader}>
        <h2>Edit Product</h2>
        <p className={Styles.muted}>
          Update product price, description, category, and other listing details.
        </p>
      </div>

      {loading ? (
        <p className={Styles.muted}>Loading product...</p>
      ) : (
        <>
          {error && <p className={Styles.error}>{error}</p>}

          {!error && (
            <div className={Styles.panel}>
              <form onSubmit={handleSubmit} className={Styles.form}>
                <input
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Product Name"
                  required
                />

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="Price"
                  min="1"
                  required
                />

                <input
                  type="number"
                  name="discount"
                  value={product.discount}
                  onChange={handleChange}
                  placeholder="Discount %"
                  min="0"
                  max="90"
                />

                <input
                  type="number"
                  name="discountedPrice"
                  value={product.discountedPrice}
                  placeholder="Final Price"
                  readOnly
                />

                <input
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  placeholder="Category"
                  required
                />

                <input
                  type="number"
                  name="stock"
                  value={product.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  min="0"
                  required
                />

                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Description"
                />

                {product.imageUrl && (
                  <img
                    src={`http://localhost:8080${product.imageUrl}`}
                    alt={product.name}
                    style={{ width: "120px", borderRadius: "10px" }}
                  />
                )}

                <button
                  type="submit"
                  className={`${Styles.button} ${Styles.primaryButton}`}
                >
                  Update Product
                </button>
              </form>
            </div>
          )}
        </>
      )}
    </AdminLayout>
  );
};

export default EditProduct;
