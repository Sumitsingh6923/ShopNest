import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import Styles from "../styles/Admin.module.css";
import api from "../../api/axiosConfig";

const AdminDashboard = () => {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(0);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/users/count");

      setUsers(res.data);

      const prodRes = await api.get("/admin/products/count");
      setProducts(prodRes.data);
      const orderRes = await api.get("/admin/orders/count");
      setOrders(orderRes.data);
    } catch (error) {
      console.error("Admin API Error:", error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <AdminLayout>
      <h1>Admin Dashboard</h1>

      <div className={Styles.cards}>
        <div className={Styles.card}>
          <h3>Users</h3>
          <p>{users}</p>
        </div>

        <div className={Styles.card}>
          <h3>Products</h3>
          <p>{products}</p>
        </div>

        <div className={Styles.card}>
          <h3>Orders</h3>
          <p>{orders}</p>
        </div>
      </div>

      <div style={{ marginTop: "30px" }}>
        <Link to="/admin/add-product">
          <button>Add Product</button>
        </Link>

        <Link to="/admin/products">
          <button style={{ marginLeft: "10px" }}>Manage Products</button>
        </Link>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
