import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGlow}></div>

      <div className={styles.footerContainer}>
        <div className={styles.brandColumn}>
          <span className={styles.brandBadge}>Curated everyday style</span>

          <div className={styles.brandLockup}>
            <span className={styles.brandMark}>SN</span>
            <div>
              <h2 className={styles.brandTitle}>ShopNest</h2>
              <p className={styles.brandSub}>
                Fresh picks. Fast checkout. Easy reorders.
              </p>
            </div>
          </div>

          <p className={styles.brandText}>
            Your one-stop destination for fashion, footwear, accessories, and
            everyday essentials with a sharper shopping experience.
          </p>

          <div className={styles.highlightCard}>
            <div>
              <span className={styles.highlightLabel}>This week</span>
              <strong>Trending deals up to 40% off</strong>
            </div>
            <a href="/category/shoes" className={styles.highlightLink}>
              Shop now
            </a>
          </div>

          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" aria-label="Twitter X">
              <i className="bi bi-twitter-x"></i>
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3>Explore</h3>
          <ul className={styles.linkList}>
            <li>
              <a href="/">Home</a>
            </li>

            <li>
              <a href="/category/men">Men</a>
            </li>
            <li>
              <a href="/category/women">Women</a>
            </li>
            <li>
              <a href="/category/shoes">Shoes</a>
            </li>
            <li>
              <a href="/cart">Cart</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Customer Care</h3>
          <ul className={styles.linkList}>
            <li>
              <a href="/order">My Orders</a>
            </li>
            <li>
              <a href="/checkout">Checkout</a>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3>Contact</h3>
          <div className={styles.contactCard}>
            <p>
              <i className="bi bi-envelope"></i>
              <span>support@shopnest.com</span>
            </p>
            <p>
              <i className="bi bi-telephone"></i>
              <span>+91 93150******</span>
            </p>
            <p>
              <i className="bi bi-geo-alt"></i>
              <span>India support hub, 7 days a week</span>
            </p>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>© 2026 ShopNest. All rights reserved.</span>
        <span>
          Designed for better discovery, faster checkout, and a smoother
          shopping flow.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
