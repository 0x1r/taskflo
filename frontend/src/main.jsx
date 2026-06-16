import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import PublicRoute from "./pages/PublicRoute.jsx";
import HomeRedirect from "./pages/HomeRedirect.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";
import MainLayout from "./pages/MainLayout.jsx";
import User from "./pages/User.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/user" element={<User />}></Route>
            </Route>
          </Route>

          <Route path="/" element={<HomeRedirect />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
