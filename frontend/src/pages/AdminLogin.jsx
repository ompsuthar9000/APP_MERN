import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginAdmin } from "../api/authApi";
import toast, { Toaster } from "react-hot-toast";

const AdminLogin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const loginPromise = loginAdmin(data);
    
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "Login Successful!",
      error: (err) => err.message || "Login Failed "
    });

    try {
      await loginPromise;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-indigo-700">Admin Portal</h1>
        <div className="space-x-4">
          <Link to="/register/customer" className="text-indigo-600 hover:underline">
            Register as Customer
          </Link>
          <Link to="/register/admin" className="text-indigo-600 hover:underline">
            Register as Admin
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center p-6">
        <Toaster />
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-center text-2xl font-bold text-gray-900">Admin Login</h2>
          <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email address
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                id="email"
                type="email"
                autoComplete="email"
                className="block w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                id="password"
                type="password"
                autoComplete="current-password"
                className="block w-full mt-2 px-3 py-2 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
