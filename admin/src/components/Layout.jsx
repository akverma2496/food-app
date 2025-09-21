// src/components/Layout.jsx
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/authSlice";
import { toast } from "react-toastify";

export default function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div
        className="d-flex flex-column p-3 text-white"
        style={{ width: "250px", backgroundColor: "#343a40" }}
      >
        <h4 className="text-center mb-4">Fast-Food Admin</h4>
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <NavLink to="/dashboard" className="nav-link text-white">
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className="nav-link text-white">
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink to="/recipes" className="nav-link text-white">
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink to="/orders" className="nav-link text-white">
              Orders
            </NavLink>
          </li>
        </ul>
        <button className="btn btn-danger mt-auto" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet /> {/* Renders child routes here */}
      </div>
    </div>
  );
}
