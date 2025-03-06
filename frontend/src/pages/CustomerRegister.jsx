import { useForm } from "react-hook-form";
import { registerCustomer } from "../api/authApi";

const CustomerRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerCustomer(data);
      alert(response.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Customer Registration</h2>

        <input 
          {...register("firstName", { required: "First name is required" })} 
          placeholder="First Name" 
          className="w-full px-4 py-3 mt-2 bg-gradient-to-r from-blue-300 to-indigo-400 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

        <input 
          {...register("lastName", { required: "Last name is required" })} 
          placeholder="Last Name" 
          className="w-full px-4 py-3 mt-3 bg-gradient-to-r from-blue-300 to-indigo-400 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

        <input 
          {...register("email", { required: "Email is required" })} 
          placeholder="Email" 
          className="w-full px-4 py-3 mt-3 bg-gradient-to-r from-blue-300 to-indigo-400 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input 
          {...register("password", { required: "Password is required" })} 
          type="password" 
          placeholder="Password" 
          className="w-full px-4 py-3 mt-3 bg-gradient-to-r from-blue-300 to-indigo-400 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="mt-5 bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition duration-300">
          Register
        </button>
      </form>
    </div>
  );
};

export default CustomerRegister;
