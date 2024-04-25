import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import ErrorPage from "../pages/ErrorPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import UserLogPage from "../pages/UserLogPage";
import ProductPage from "../pages/ProductPage";
import FavPage from "../pages/FavPage";
import CartPage from "../pages/CartPage";
import AdminPage from "../pages/AdminPage";
import AdminUsersPage from "../pages/AdminUsersPage";
import AdminProductsPage from "../pages/AdminProductsPage";
import RegisterFormik from "../pages/RegisterFormik";

const RoutesViews = () => {
  return (
    <>
      <Routes>
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/home-userLog" element={<UserLogPage />} />
        <Route path="/home-adminLog" element={<AdminPage />} />
        <Route path="/home-adminLog/users" element={<AdminUsersPage />} />
        <Route path="/home-adminLog/products" element={<AdminProductsPage />} />
        <Route path="/favorite" element={<FavPage />} />
        <Route path="/cart" element={<CartPage />} />
        {/*  <Route path="/register" element={<RegisterPage />} /> */}
        <Route path="/register" element={<RegisterFormik />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default RoutesViews;
