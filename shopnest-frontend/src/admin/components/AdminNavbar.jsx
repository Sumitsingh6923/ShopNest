import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";
import Styles from "../styles/Admin.module.css";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <header className={Styles.adminNavbar}>
      <div className={Styles.adminNavbarBrand}>
        <span className={Styles.adminNavbarBadge}>Control Center</span>
        <Link to="/admin/dashboard" className={Styles.adminNavbarTitle}>
          ShopNest Admin
        </Link>
      </div>

      <nav className={Styles.adminNavbarLinks}>
        <NavLink to="/admin/dashboard">Dashboard</NavLink>
        <NavLink to="/admin/products">Products</NavLink>
        <NavLink to="/admin/orders">Orders</NavLink>
        <NavLink to="/admin/users">Users</NavLink>
      </nav>

      <div className={Styles.adminNavbarActions}>
        <span className={Styles.adminUserPill}>
          {user?.name || "Admin"}
        </span>
        <button className={Styles.adminLogoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default AdminNavbar;
