import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import UserLogPage from "../pages/UserLogPage";
import ProductPage from "../pages/ProductPage";
import FavPage from "../pages/FavPage";
import CartPage from "../pages/CartPage";
import AdminPage from "../pages/AdminPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminProductsPage from "../pages/AdminProductsPage";
import RegisterFormik from "../pages/RegisterFormik";
import PrivateRoute from "../components/PrivateRoute";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route
          path="/home-userLog"
          element={
            <PrivateRoute role={"user"}>
              <UserLogPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/home-adminLog"
          element={
            <PrivateRoute role={"admin"}>
              <AdminPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/home-adminLog/users"
          element={
            <PrivateRoute role={"admin"}>
              <AdminUsersPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/home-adminLog/products"
          element={
            <PrivateRoute role={"admin"}>
              <AdminProductsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorite"
          element={
            <PrivateRoute role={"user"}>
              <FavPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <PrivateRoute role={"user"}>
              <CartPage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterFormik />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
