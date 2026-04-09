import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../../api/axiosConfig";
import Styles from "../styles/Admin.module.css";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to load admin orders", err);
      setError("Failed to load orders.");
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      setUpdatingOrderId(orderId);
      const res = await api.put(`/admin/orders/${orderId}/status?status=${status}`);

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, ...res.data } : order,
        ),
      );
      setError("");
    } catch (err) {
      console.error("Failed to update order status", err);
      setError(err.response?.data || "Failed to update order status.");
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const getStatusClassName = (status) => {
    if (status === "SHIPPED") {
      return `${Styles.status} ${Styles.statusShipped}`;
    }

    if (status === "DELIVERED") {
      return `${Styles.status} ${Styles.statusDelivered}`;
    }

    return `${Styles.status} ${Styles.statusPending}`;
  };

  return (
    <AdminLayout>
      <div className={Styles.pageHeader}>
        <h1>Orders</h1>
        <p className={Styles.muted}>Track, ship, and complete customer orders.</p>
      </div>

      {error && <p className={Styles.error}>{error}</p>}

      <div className={Styles.panel}>
        {orders.length === 0 ? (
          <p className={Styles.muted}>No orders found yet.</p>
        ) : (
          <table className={Styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id}</td>
                  <td>{o.userId ?? "-"}</td>
                  <td>{o.quantity ?? o.items?.length ?? 0}</td>
                  <td>₹{o.totalPrice}</td>
                  <td>
                    <span className={getStatusClassName(o.status)}>{o.status}</span>
                  </td>
                  <td>
                    <div className={Styles.actionGroup}>
                      <button
                        className={`${Styles.button} ${Styles.primaryButton}`}
                        onClick={() => updateStatus(o.id, "SHIPPED")}
                        disabled={updatingOrderId === o.id || o.status === "SHIPPED"}
                      >
                        Ship
                      </button>
                      <button
                        className={`${Styles.button} ${Styles.successButton}`}
                        onClick={() => updateStatus(o.id, "DELIVERED")}
                        disabled={updatingOrderId === o.id || o.status === "DELIVERED"}
                      >
                        Deliver
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

export default AdminOrders;
