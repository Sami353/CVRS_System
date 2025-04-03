import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>Superadmin Menu</h2>
      <ul className="sidebar-menu">
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/create-hospital">Create Hospital</Link>
        </li>
        <li>
          <Link to="/view-hospitals">View Hospitals</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
