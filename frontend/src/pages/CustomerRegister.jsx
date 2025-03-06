import { useForm } from "react-hook-form";
import { registerCustomer } from "../api/authApi";
import toast, { Toaster } from "react-hot-toast";

const CustomerRegister = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    const registerPromise = registerCustomer(data);

    toast.promise(registerPromise, {
      loading: "Registering...",
      success: (response) => response.message || "Registration Successful!",
      error: (error) =>error
    });

    try {
      await registerPromise;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-semibold text-center text-blue-700 mb-6">Customer Registration</h2>

        <div className="space-y-4">
          <div>
            <input 
              {...register("firstName", { required: "First name is required" })} 
              placeholder="First Name" 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>}
          </div>

          <div>
            <input 
              {...register("lastName", { required: "Last name is required" })} 
              placeholder="Last Name" 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>}
          </div>

          <div>
            <input 
              {...register("email", { required: "Email is required" })} 
              placeholder="Email" 
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <input 
              {...register("password", { 
                required: "Password is required", 
                minLength: { value: 6, message: "Password must be at least 6 characters" } 
              })} 
              type="password" 
              placeholder="Password" 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <input 
              {...register("confirmPassword", { required: "Confirm Password is required" })} 
              type="password" 
              placeholder="Confirm Password" 
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button type="submit" className="mt-5 bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default CustomerRegister;
