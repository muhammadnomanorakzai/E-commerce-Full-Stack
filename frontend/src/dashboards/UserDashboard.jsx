import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
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
        <h1 className="text-2xl font-bold mb-2">Welcome, {userInfo.name}</h1>
        <p className="text-gray-600 mb-4">User Dashboard</p>

        <div className="flex gap-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            My Orders
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            My Cart
          </button>
          <button
            onClick={logoutHandler}
            className="bg-red-500 text-white px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
