import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/404.jsx";
import VenuePage from "./pages/VenuePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { useAuth } from "./contexts/AuthContext.jsx";
import Layout from "./pages/Layout.jsx";
import { Toaster } from "react-hot-toast";
import Profile from "./pages/Profile.jsx";
import Venues from "./pages/Venues.jsx";

const App = () => {
  const { isloggedin } = useAuth();

  return (
    <>
      <Toaster />
      <Routes>
        <Route
          path="/login"
          element={isloggedin ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={isloggedin ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="venue/:id" element={<VenuePage />} />
          <Route path="profile" element={<Profile />} />
          <Route path="venues" element={<Venues />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
