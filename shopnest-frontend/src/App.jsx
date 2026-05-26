import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";

import Home from "./pages/Home/Home";
import Register from "./pages/Login/Register";
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import UserOrder from "./pages/Order/UserOrder";
import Checkout from "./pages/Checkout/Checkout";

import AdminDashboard from "./admin/pages/AdminDashBoard";
import EditProduct from "./admin/pages/EditProduct";
import ManageProducts from "./admin/pages/ManageProducts";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminUsers from "./admin/pages/AdminUsers";
import AddProduct from "./admin/pages/AddProduct";

import Footer from "./components/Footer/Footer";

function AppContent() {
  const { user, loading, isInitialized } = useSelector((state) => state.auth);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (loading || !isInitialized) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      <Routes>
        {/* Customer Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/category/:category" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<UserOrder />} />
        <Route path="/orders" element={<Navigate to="/order" replace />} />
        <Route path="/checkout" element={<Checkout />} />

        {/* Admin redirect */}
        <Route path="/admin" element={<Navigate to="/admin/dashboard" />} />

        {/* Admin Protected Routes */}

        <Route
          path="/admin/dashboard"
          element={
            user && user.role === "ROLE_ADMIN" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin/products"
          element={
            user && user.role === "ROLE_ADMIN" ? (
              <ManageProducts />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin/orders"
          element={
            user && user.role === "ROLE_ADMIN" ? (
              <AdminOrders />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin/users"
          element={
            user && user.role === "ROLE_ADMIN" ? (
              <AdminUsers />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin/add-product"
          element={
            user && user.role === "ROLE_ADMIN" ? (
              <AddProduct />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/admin/edit-product/:id"
          element={
            user && user.role === "ROLE_ADMIN" ? (
              <EditProduct />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
