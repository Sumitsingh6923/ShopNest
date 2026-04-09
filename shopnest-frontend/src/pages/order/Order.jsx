import { useEffect, useState } from "react";
import Styles from "./Order.module.css";
import api from "../../api/axiosConfig";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  // FETCH ORDERS
  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");

      setOrders(res.data);
    } catch (error) {
      console.log("Failed to load orders", error);
    }
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/orders/${id}/status?status=${status}`);

      fetchOrders();
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <div className={Styles.ordersContainer}>
      <h1>Order Management</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <div className={Styles.ordersList}>
          {orders.map((order) => (
            <div key={order.id} className={Styles.orderCard}>
              {/* ORDER HEADER */}

              <div className={Styles.orderHeader}>
                <p>
                  <strong>Order ID:</strong> {order.id}
                </p>

                <p>
                  <strong>Status:</strong> {order.status}
                </p>

                <p>
                  <strong>Total:</strong> ₹ {order.totalPrice}
                </p>
              </div>

              {/* PRODUCTS */}

              <div className={Styles.products}>
                {order.items?.map((item) => (
                  <div key={item.id} className={Styles.product}>
                    <img
                      src={`http://localhost:8080${item.product.imageUrl}`}
                      alt={item.product.name}
                    />

                    <div>
                      <h4>{item.product.name}</h4>

                      <p>₹ {item.product.price}</p>

                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}

              <div className={Styles.total}>
                <h3>Total: ₹ {order.totalPrice}</h3>
              </div>

              {/* ADMIN ACTIONS */}

              <div className={Styles.actions}>
                <button
                  className={Styles.shipBtn}
                  onClick={() => updateStatus(order.id, "SHIPPED")}
                >
                  Ship
                </button>

                <button
                  className={Styles.deliverBtn}
                  onClick={() => updateStatus(order.id, "DELIVERED")}
                >
                  Deliver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
