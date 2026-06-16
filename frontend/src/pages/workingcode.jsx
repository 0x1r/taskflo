import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Input from "../components/Input";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "anurag@gmail.com",
    password: "123",
  });

  const validatorConfig = {
    email: [
      { required: true, message: "email is required" },
      {
        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "this is not a valid email",
      },
    ],
  };

  const [error, setError] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const validator = (formData) => {
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      const rules = validatorConfig[key];
      if (!rules) return;
      rules.some((rule) => {
        if (rule.required && !value) {
          errors[key] = rule.message;
          return true;
        }
        if (rule.minlength > value.length) {
          errors[key] = rule.message;
          return true;
        }
        if (rule.pattern && rule.pattern.test(value) === false) {
          errors[key] = rule.message;
          return true;
        }
      });
    });
    setError(errors);
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validator(formData);
    if (Object.entries(errors).length) return;

    const apiResponse = await fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const response = await apiResponse.json();

    if (response.message === "Logging in") {
      showToast("Logging in...", "success");
      setTimeout(() => navigate("/dashboard"), 1500);
    } else {
      showToast(response.message, "error");
    }
  };

  return (
    <>
      <div className={`fixed top-5 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all duration-500 z-50
        ${toast.show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"}
        ${toast.type === "success" ? "bg-green-500" : "bg-red-500"}
      `}>
        {toast.message}
      </div>

      <div className="bg-[#d5dae3] min-h-dvh flex items-center justify-center">
        <div className="card bg-[#f6f5f9] w-xs max-w-md p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-bold">TaskFlow</h1>
            <span className="text-sm">Pro</span>
          </div>

          <div className="flex flex-col items-center">
            <form onSubmit={handleSubmit}>
              <div className="text-[#9da2aa] mb-2">Email</div>
              <Input
                type="text"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={error.email}
              />

              <div className="text-[#9da2aa] mb-2">Password</div>
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />

              <button className="border bg-[#246ee1] my-2 w-full text-amber-50 p-1 rounded-md">
                Sign In
              </button>
            </form>
          </div>

          <div className="mt-2 flex items-center gap-3">
            <hr className="flex-1 border-t border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-1 border-t border-gray-300" />
          </div>

          <div className="flex justify-center mt-3 mb-5">
            <span className="text-gray-500 text-xs">
              New here?{" "}
              <Link className="text-blue-600" to="/register">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
}