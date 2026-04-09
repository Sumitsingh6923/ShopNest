import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const userId = useSelector((state) => state.auth.user?.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      navigate("/login");
      return;
    }

    fetchOrders();
  }, [userId, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/api/orders/user/${userId}`);
      setOrders(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to load orders", err);
      setError(err.response?.data || "Failed to load order history.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (value) => {
    if (!value) {
      return "-";
    }

    return new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <h1>My Orders</h1>

        {loading && <p>Loading your order history...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && orders.length === 0 && (
          <p>You have not placed any orders yet.</p>
        )}

        {orders.map((order) => (
          <div
            key={order.id}
            style={{
              border: "1px solid #ddd",
              margin: "20px 0",
              padding: "20px",
              borderRadius: "10px",
              background: "#fff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                flexWrap: "wrap",
                marginBottom: "16px",
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>Order #{order.id}</h3>
                <p style={{ margin: "6px 0 0" }}>
                  Placed: {formatDate(order.orderDate)}
                </p>
              </div>

              <div>
                <p style={{ margin: 0 }}>Status: {order.status}</p>
                <p style={{ margin: "6px 0 0" }}>
                  Total: ₹{order.totalPrice}
                </p>
              </div>
            </div>

            {order.items?.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                  padding: "12px 0",
                  borderTop: "1px solid #eee",
                }}
              >
                <img
                  src={`http://localhost:8080${item.product.imageUrl}`}
                  alt={item.product.name}
                  width="72"
                  height="72"
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />

                <div>
                  <p style={{ margin: 0, fontWeight: "600" }}>
                    {item.product.name}
                  </p>
                  <p style={{ margin: "4px 0 0" }}>Qty: {item.quantity}</p>
                  <p style={{ margin: "4px 0 0" }}>Price: ₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default UserOrders;
