import { useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../../api/axiosConfig";
import Styles from "../styles/Admin.module.css";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    discountedPrice: "",
    stock: "",
    category: "",
    imageUrl: "",
  });

  const [file, setFile] = useState(null);

  const getErrorMessage = (error) => {
    const responseData = error.response?.data;

    if (typeof responseData === "string" && responseData.trim()) {
      return responseData;
    }

    if (responseData?.message) {
      return responseData.message;
    }

    return "Failed to add product";
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedProduct = {
      ...product,
      [name]: value,
    };

    if (name === "price" || name === "discount") {
      const price = name === "price" ? value : product.price;
      const discount = name === "discount" ? value : product.discount;

      if (price && discount) {
        const discountedPrice = price - (price * discount) / 100;
        updatedProduct.discountedPrice = Math.round(discountedPrice);
      } else if (price) {
        updatedProduct.discountedPrice = Math.round(Number(price));
      } else {
        updatedProduct.discountedPrice = "";
      }
    }

    setProduct(updatedProduct);
  };

  // IMAGE UPLOAD
  const uploadImage = async () => {
    if (!file) {
      alert("Select image first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProduct((prev) => ({
        ...prev,
        imageUrl: res.data,
      }));

      alert("Image uploaded successfully");
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    }
  };
  // ADD PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedName = product.name.trim();
    const trimmedCategory = product.category.trim().toLowerCase();
    const trimmedDescription = product.description.trim();
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

    if (!product.imageUrl) {
      alert("Upload product image first");
      return;
    }

    try {
      await api.post("/admin/product", {
        name: trimmedName,
        description: trimmedDescription,
        price,
        discount,
        discountedPrice: Math.round(price - (price * discount) / 100),
        stock,
        category: trimmedCategory,
        imageUrl: product.imageUrl,
      });

      alert("Product Added Successfully");

      setProduct({
        name: "",
        description: "",
        price: "",
        discount: "",
        discountedPrice: "",
        stock: "",
        category: "",
        imageUrl: "",
      });

      setFile(null);
    } catch (error) {
      console.error(error);
      alert(getErrorMessage(error));
    }
  };

  return (
    <AdminLayout>
      <h2>Add Product</h2>

      <form onSubmit={handleSubmit} className={Styles.form}>
        <input
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount %"
          value={product.discount}
          onChange={handleChange}
          min="0"
          max="90"
        />

        <input
          type="number"
          name="discountedPrice"
          placeholder="Final Price"
          value={product.discountedPrice}
          readOnly
        />
        <input
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={product.stock}
          onChange={handleChange}
          min="0"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        <input type="file" onChange={(e) => setFile(e.target.files[0])} />

        <button type="button" onClick={uploadImage}>
          Upload Image
        </button>

        {product.imageUrl && (
          <img
            src={`http://localhost:8080${product.imageUrl}`}
            alt="preview"
            style={{ width: "120px", marginTop: "10px" }}
          />
        )}

        <button type="submit">Add Product</button>
      </form>
    </AdminLayout>
  );
};

export default AddProduct;
