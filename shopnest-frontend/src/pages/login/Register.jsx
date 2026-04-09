import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Styles from "./Login.module.css";
import api from "../../api/axiosConfig";

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "ROLE_USER",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/api/auth/register", form);

      setSuccess("Registration successful! Redirecting to login...");
      setError("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 400) {
        setError("Invalid data. Please check fields.");
      } else if (err.response?.status === 409) {
        setError("Email already exists.");
      } else {
        setError("Server error. Please try again.");
      }
    }
  };

  return (
    <div className={Styles.authContainer}>
      <form className={Styles.authCard} onSubmit={handleSubmit}>
        <h2>Create ShopNest Account</h2>

        {error && <p className={Styles.error}>{error}</p>}
        {success && <p className={Styles.success}>{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select name="role" value={form.role} onChange={handleChange}>
          <option value="ROLE_USER">User</option>
          <option value="ROLE_ADMIN">Admin</option>
        </select>

        <button type="submit">Register</button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
