import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import Styles from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/?search=${search}`);
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg sticky-top ${Styles.navbar}`}>
      <div className="container-fluid px-0">
        <div className={Styles.brandArea}>
          <Link to="/" className={Styles.logo}>
            <span className={Styles.logoMark}>SN</span>

            <span className={Styles.logoText}>
              Shop<span className={Styles.logoAccent}>Nest</span>
            </span>
          </Link>

          <span className={Styles.tagline}>
            Style-led shopping, everyday ease.
          </span>
        </div>

        <div className={Styles.searchShell}>
          <i className={`bi bi-search ${Styles.searchIcon}`}></i>

          <input
            className={Styles.search}
            type="text"
            placeholder="Search products, brands, and styles"
            value={search}
            onKeyDown={handleSearch}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={`d-flex align-items-center gap-3 ${Styles.navArea}`}>
          <div
            className={`d-flex flex-wrap align-items-center gap-2 ${Styles.navLinks}`}
          >
            <Link
              to="/"
              className={`nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${Styles.navPill}`}
            >
              <i className="bi bi-house-door"></i>
              <span>Home</span>
            </Link>

            <Link
              to="/cart"
              className={`nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${Styles.navPill}`}
            >
              <i className="bi bi-bag"></i>
              <span>Cart</span>
            </Link>

            <Link
              to="/order"
              className={`nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${Styles.navPill}`}
            >
              <i className="bi bi-box-seam"></i>
              <span>Orders</span>
            </Link>

            {user?.role === "ROLE_ADMIN" && (
              <Link
                to="/admin"
                className={`nav-link px-3 py-2 rounded-pill d-flex align-items-center gap-2 ${Styles.navPill}`}
              >
                <i className="bi bi-speedometer2"></i>
                <span>Admin</span>
              </Link>
            )}
          </div>

          <div className={Styles.authArea}>
            {isAuthenticated && user?.name && (
              <span className={Styles.userBadge}>{user.name}</span>
            )}

            {isAuthenticated ? (
              <button className={Styles.authButton} onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login" className={Styles.authButton}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
