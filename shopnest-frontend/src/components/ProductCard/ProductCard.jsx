import styles from "./ProductCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addCartItem, removeCartItem } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItem = useSelector((state) =>
    state.cart.items.find((item) => item.product?.id === product.id),
  );

  const addToCart = async (productId) => {
    const resultAction = await dispatch(addCartItem({ productId, quantity: 1 }));

    if (addCartItem.fulfilled.match(resultAction)) {
      alert("Added to cart");
    } else {
      const message = resultAction.payload || "Failed to add to cart";
      alert(message);

      if (message.includes("log in")) {
        navigate("/login");
      }
    }
  };

  const removeFromCart = async (cartItemId) => {
    const resultAction = await dispatch(removeCartItem(cartItemId));

    if (removeCartItem.fulfilled.match(resultAction)) {
      alert("Removed from cart");
    } else {
      const message = resultAction.payload || "Failed to remove from cart";
      alert(message);
    }
  };

  const handleCartAction = () => {
    if (cartItem) {
      removeFromCart(cartItem.id);
      return;
    }

    addToCart(product.id);
  };

  const buttonLabel =
    product.stock < 1 ? "Out of Stock" : cartItem ? "Remove" : "Add to Cart";
  const buttonClassName = `${styles.cartBtn} ${cartItem ? styles.removeBtn : ""}`;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrap}>
        <span className={styles.discountBadge}>{product.discount}% OFF</span>
        <img
          src={`http://localhost:8080${product.imageUrl}`}
          alt={product.name}
          className={styles.image}
        />
      </div>

      <div className={styles.body}>
        <div className={styles.topRow}>
          <p className={styles.category}>{product.category}</p>
          <span
            className={`${styles.stockBadge} ${
              product.stock > 0 ? styles.inStock : styles.lowStock
            }`}
          >
            {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
          </span>
        </div>

        <h4 className={styles.title}>{product.name}</h4>

        <p className={styles.description}>{product.description}</p>

        <div className={styles.priceBlock}>
          <span className={styles.salePrice}>₹{product.discountedPrice}</span>
          <span className={styles.original}>₹{product.price}</span>
        </div>

        <p className={styles.stock}>Stock available: {product.stock}</p>

        <button
          className={buttonClassName}
          onClick={handleCartAction}
          disabled={product.stock < 1}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
