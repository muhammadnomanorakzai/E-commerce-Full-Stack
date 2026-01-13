import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">
          Admin Panel – {userInfo.name}
        </h1>
        <p className="text-gray-600 mb-4">Admin Dashboard</p>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-indigo-500 text-white p-3 rounded">
            Manage Users
          </button>
          <button className="bg-purple-500 text-white p-3 rounded">
            Manage Products
          </button>
          <button className="bg-yellow-500 text-white p-3 rounded">
            Orders
          </button>
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white p-3 rounded">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
