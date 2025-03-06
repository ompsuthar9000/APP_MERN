import { useForm } from "react-hook-form";
import { registerAdmin } from "../api/authApi";

const AdminRegister = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerAdmin(data);
      alert(response.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 to-teal-600 p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">Admin Registration</h2>

        <input {...register("firstName", { required: "First name is required" })} placeholder="First Name" className="w-full px-4 py-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
        {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}

        <input {...register("lastName", { required: "Last name is required" })} placeholder="Last Name" className="w-full px-4 py-3 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
        {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}

        <input {...register("email", { required: "Email is required" })} placeholder="Email" className="w-full px-4 py-3 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <input {...register("password", { required: "Password is required" })} type="password" placeholder="Password" className="w-full px-4 py-3 mt-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

        <button type="submit" className="mt-5 bg-green-600 text-white w-full py-3 rounded-lg hover:bg-green-700 transition duration-300">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;
