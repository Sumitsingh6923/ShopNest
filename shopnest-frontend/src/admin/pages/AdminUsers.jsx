import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import api from "../../api/axiosConfig";
import Styles from "../styles/Admin.module.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users");
      setUsers(res.data);
      setError("");
    } catch (err) {
      console.error("Failed to load users", err);
      setError("Failed to load users.");
    }
  };

  return (
    <AdminLayout>
      <div className={Styles.pageHeader}>
        <h1>Users</h1>
        <p className={Styles.muted}>View all registered ShopNest accounts.</p>
      </div>

      {error && <p className={Styles.error}>{error}</p>}

      <div className={Styles.panel}>
        {users.length === 0 ? (
          <p className={Styles.muted}>No users found.</p>
        ) : (
          <table className={Styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
