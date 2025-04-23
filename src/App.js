import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login.js";
import Register from "./components/register/Register.js";
import ForgotPassword from "./components/forgotPassword/ForgotPassword.js";
import './scss/style.scss'
import DefaultLayout from "./layout/DefaultLayout.js";
import PrivateRoute from './components/PrivateRoute'; 

function App() {

  // return (
  //   <Router>
  //     <Routes>
  //       <Route exact path="/login" name="Login Page" element={<Login />} />
  //       <Route exact path="/register" name="Register Page" element={<Register />} />
  //       <Route path="/forgot-password" element={<ForgotPassword />} />
  //       <Route path="*" name="Home" element={<DefaultLayout />} />

  //     </Routes>
  //   </Router>
  // );


  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Route */}
        <Route
          path="*"
          element={
            <PrivateRoute>
              <DefaultLayout />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
