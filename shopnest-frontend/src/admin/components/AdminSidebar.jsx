import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../Store/authSlice";
import Styles from "../styles/Admin.module.css";

const AdminSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div className={Styles.sidebar}>
      <div className={Styles.adminBrand}>
        <span className={Styles.adminBrandMark}>SN</span>
        <div className={Styles.adminBrandCopy}>
          <h2 className={Styles.logo}>ShopNest</h2>
          <p className={Styles.adminBrandSub}>Admin Panel</p>
        </div>
      </div>

      <Link to="/admin">Dashboard</Link>

      <NavLink to="/admin/products">Products</NavLink>

      <Link to="/admin/orders">Orders</Link>

      <Link to="/admin/users">Users</Link>

      <button className={Styles.sidebarLogout} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
