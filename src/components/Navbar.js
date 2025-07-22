import React, { useContext } from "react";
import { AuthContext } from "./AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div className="navbar">
      <span>📂 Resume Scoring System</span>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Navbar;
