import AdminSidebar from "./AdminSidebar";
import Styles from "../styles/Admin.module.css";

const AdminLayout = ({ children }) => {
  return (
    <div className={Styles.adminPage}>
      <div className={Styles.adminContainer}>
        <AdminSidebar />

        <div className={Styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
