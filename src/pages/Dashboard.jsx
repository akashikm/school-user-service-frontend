import { NavLink } from "react-router-dom";

function Dashboard() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="fixed top-4 right-4 text-gray-700 font-semibold cursor-pointer">
        <NavLink to="/">
          Logout
        </NavLink>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to the Dashboard
      </h1>
      <p className="text-lg text-gray-600">You have successfully logged in.</p>
    </div>
  );
}

export default Dashboard;
