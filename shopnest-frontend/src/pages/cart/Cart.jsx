import { useEffect } from "react";
import Styles from "./Cart.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import {
  fetchCart,
  removeCartItem,
  updateCartItemQuantity,
} from "../../Store/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    items: cartItems,
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

  const removeItem = async (id) => {
    dispatch(removeCartItem(id));
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    dispatch(updateCartItemQuantity({ id, quantity }));
  };

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <>
      <Navbar />

      <div className={Styles.cartPage}>
        <div className={Styles.cartContainer}>
          <div className={Styles.header}>
            <div>
              <p className={Styles.eyebrow}>Shopping Cart</p>
              <h1>Your picks are almost ready</h1>
              <p className={Styles.subtext}>
                Review your items, update quantity, and move to checkout when
                you are ready.
              </p>
            </div>
            <div className={Styles.summaryBadge}>
              <span>{cartItems.length}</span>
              <p>items in cart</p>
            </div>
          </div>

          {loading && <p className={Styles.infoText}>Loading cart...</p>}
          {error && <p className={Styles.errorText}>{error}</p>}

          {cartItems.length === 0 ? (
            <div className={Styles.emptyState}>
              <h2>Your cart is empty</h2>
              <p>
                Looks like you have not added anything yet. Start exploring
                products and fill it up.
              </p>
            </div>
          ) : (
            <div className={Styles.cartLayout}>
              <div className={Styles.cartItems}>
                {cartItems.map((item) => {
                  if (!item.product) {
                    return null;
                  }

                  const originalPrice = item.product.price;
                  const discountedPrice =
                    item.product.discountedPrice ?? item.product.price;
                  const lineTotal = discountedPrice * item.quantity;

                  return (
                    <div key={item.id} className={Styles.cartItem}>
                      <div className={Styles.imageWrap}>
                        <img
                          src={`http://localhost:8080${item.product.imageUrl}`}
                          alt={item.product.name}
                        />
                      </div>

                      <div className={Styles.details}>
                        <div className={Styles.productTop}>
                          <div>
                            <p className={Styles.category}>
                              {item.product.category}
                            </p>
                            <h3>{item.product.name}</h3>
                          </div>
                          <button
                            className={Styles.remove}
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.product.name} from cart`}
                            title="Remove from cart"
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>

                        <p className={Styles.description}>
                          {item.product.description}
                        </p>

                        <div className={Styles.metaRow}>
                          <div className={Styles.priceGroup}>
                            <span className={Styles.priceLabel}>Original:</span>
                            <span className={Styles.originalPriceValue}>
                              ₹ {originalPrice}
                            </span>
                          </div>

                          <div className={Styles.priceGroup}>
                            <span className={Styles.priceLabel}>
                              Discounted:
                            </span>
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

                          <div className={Styles.quantity}>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              -
                            </button>

                            <span>{item.quantity}</span>

                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <aside className={Styles.summaryCard}>
                <p className={Styles.summaryLabel}>Order Summary</p>
                <h2>Total: ₹ {total}</h2>
                <div className={Styles.summaryRow}>
                  <span>Items</span>
                  <span>{cartItems.length}</span>
                </div>
                <div className={Styles.summaryRow}>
                  <span>Delivery</span>
                  <span>Free</span>
                </div>
                <div className={Styles.summaryRow}>
                  <span>Savings</span>
                  <span>Applied</span>
                </div>

                <button className={Styles.checkout} onClick={goToCheckout}>
                  Proceed to Checkout
                </button>
              </aside>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
