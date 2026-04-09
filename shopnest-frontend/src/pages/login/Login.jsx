import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, loginUser } from "../../store/authSlice";
import Styles from "./Login.module.css";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.auth,
  );

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    if (error) {
      dispatch(clearAuthError());
    }

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(loginUser(form));
  };

  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }

    if (user.role === "ROLE_ADMIN") {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <div className={Styles.authContainer}>
      <form className={Styles.authCard} onSubmit={handleSubmit}>
        <h2>Login to ShopNest</h2>

        {error && <p className={Styles.error}>{error}</p>}

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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
