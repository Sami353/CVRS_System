// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./components/login/Login.js";
// import Register from "./components/register/Register.js"
// import './scss/style.scss'
// import AdminLogin from "./components/Admin/AdminLogin.jsx";
// import DefaultLayout from "./layout/DefaultLayout.js";
// import AdminLayout from "./components/Admin/AdminLayout.jsx";

// function App() {
//       const [isLoggedIn, setIsLoggedIn] = useState('false');

//   return (
//     <Router>
//       <Routes>
//         <Route exact path="/login" name="Login Page" element={<Login />} />
//         <Route exact path="/register" name="Register Page" element={<Register />} />
//         {/* <Route exact path="/admin" name="Admin Login Page" element={<AdminLogin />} /> */}
//         <Route exact path="/admin" name="Admin Layout" element={<AdminLayout />} />

//         <Route path="*" name="Home" element={<DefaultLayout />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login/Login.js";
import Register from "./components/register/Register.js"
import './scss/style.scss'
import AdminLogin from "./components/Admin/AdminLogin.jsx";
import DefaultLayout from "./layout/DefaultLayout.js";
import Admin from "./components/Admin";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/login" name="Login Page" element={<Login />} />
        <Route exact path="/register" name="Register Page" element={<Register />} />
        <Route exact path="/admin" name="Admin" element={<Admin />} />
        <Route path="*" name="Home" element={<DefaultLayout />} />

      </Routes>
    </Router>
  );
}

export default App;
