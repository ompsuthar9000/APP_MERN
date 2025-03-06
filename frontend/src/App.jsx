import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRegister from "./pages/CustomerRegister";
import AdminRegister from "./pages/AdminRegister";
import AdminLogin from "./pages/AdminLogin";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register/customer" element={<CustomerRegister />} />
        <Route path="/register/admin" element={<AdminRegister />} />
        <Route path="/login/admin" element={<AdminLogin />} />
      </Routes>
    </Router>
  );
};

export default App;
