import { useEffect } from "react";
import api from "../../api/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../store/cartSlice";
import Navbar from "../../components/Navbar/Navbar";
import Styles from "./Checkout.module.css";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    items: cart,
    total,
    loading,
    error,
  } = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchCart());
    }
  }, [dispatch, userId]);

  const handlePayment = async () => {
    if (!userId) {
      alert("Please log in before checkout.");
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      const paymentRes = await api.post(`/payment/create?amount=${total}`);

      const paymentId = paymentRes.data.paymentId;

      await api.post(`/payment/success?paymentId=${paymentId}`);

      await api.post(`/api/orders/create/${userId}`);

      alert("Order placed successfully 🎉");

      window.location.href = "/order";
    } catch (error) {
      console.error("Payment error", error);
      alert(error.response?.data || "Checkout failed. Please try again.");
    }
  };
  return (
    <>
      <Navbar />

      <div className={Styles.checkoutPage}>
        <div className={Styles.checkoutContainer}>
          <div className={Styles.header}>
            <div>
              <p className={Styles.eyebrow}>Secure Checkout</p>
              <h2>Review and place your order</h2>
              <p className={Styles.subtext}>
                Double-check your items and continue to payment with a clean,
                fast checkout flow.
              </p>
            </div>

            <div className={Styles.statusCard}>
              <strong>{cart.length} items ready</strong>
              <p>Final step before your order is confirmed.</p>
            </div>
          </div>

          {loading && <p className={Styles.infoText}>Loading checkout items...</p>}
          {error && <p className={Styles.errorText}>{error}</p>}

          {cart.length === 0 ? (
            <div className={Styles.emptyState}>
              <h3>Your cart is empty</h3>
              <p>Add products to your cart before continuing to checkout.</p>
            </div>
          ) : (
            <div className={Styles.checkoutLayout}>
              <div className={Styles.itemList}>
                {cart.map(
                  (item) =>
                    item.product && (
                      <div key={item.id} className={Styles.itemCard}>
                        {(() => {
                          const originalPrice = item.product.price;
                          const discountedPrice =
                            item.product.discountedPrice ?? item.product.price;
                          const lineTotal = discountedPrice * item.quantity;

                          return (
                            <>
                              <div className={Styles.imageWrap}>
                                <img
                                  src={`http://localhost:8080${item.product.imageUrl}`}
                                  alt={item.product.name}
                                />
                              </div>

                              <div className={Styles.details}>
                                <div>
                                  <p className={Styles.category}>
                                    {item.product.category}
                                  </p>
                                  <h5>{item.product.name}</h5>
                                </div>

                                <p className={Styles.description}>
                                  {item.product.description}
                                </p>

                                <div className={Styles.metaRow}>
                                  <div className={Styles.priceStack}>
                                    <div className={Styles.priceGroup}>
                                      <span className={Styles.priceLabel}>Original:</span>
                                      <span className={Styles.originalPriceValue}>
                                        ₹ {originalPrice}
                                      </span>
                                    </div>
                                    <div className={Styles.priceGroup}>
                                      <span className={Styles.priceLabel}>Discounted:</span>
                                      <span className={Styles.salePrice}>
                                        ₹ {discountedPrice}
                                      </span>
                                    </div>
                                    <div className={Styles.priceGroup}>
                                      <span className={Styles.priceLabel}>Total:</span>
                                      <span className={Styles.lineTotal}>
                                        ₹ {lineTotal}
                                      </span>
                                    </div>
                                  </div>
                                  <span className={Styles.qtyBadge}>
                                    Qty: {item.quantity}
                                  </span>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    ),
                )}
              </div>

              <aside className={Styles.summaryCard}>
                <p className={Styles.summaryLabel}>Payment Summary</p>
                <h3>₹ {total}</h3>
                <div className={Styles.summaryRow}>
                  <span>Items</span>
                  <span>{cart.length}</span>
                </div>
                <div className={Styles.summaryRow}>
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className={Styles.summaryRow}>
                  <span>Taxes</span>
                  <span>Included</span>
                </div>

                <p className={Styles.paymentNote}>
                  Your payment and order confirmation will be processed
                  immediately after you continue.
                </p>

                <button className={Styles.payButton} onClick={handlePayment}>
                  Pay Now
                </button>
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Checkout;
