import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import Input from "../components/Input";

export default function Register() {
  const validatorConfig = {
    name: [
      { required: true, message: "name is required" },
      { minlength: 3, message: "name is too short" },
    ],
    email: [
      { required: true, message: "email is required" },
      {
        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        message: "this is not a valid email",
      },
    ],
    password: [
      { required: true, message: "email is required" },
      { minlength: 3, message: "password too short" },
    ],
  };

  const [formData, setFormData] = useState({
    name: "Anurag",
    email: "anurag@gmail.com",
    password: "12345678",
  });

  const [error, setError] = useState({});

  useEffect(() => {
    console.log(formData);
    console.log("error", error);
  }, [error]);

  const validator = (formData) => {
    const errors = {};
    Object.entries(formData).map(([key, value]) => {
      const rules = validatorConfig[key];
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
    console.log("errors", errors);
    if (Object.entries(errors).length) return;
    const api = await fetch("http://localhost:3000/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(api);
  };
  return (
    <div className="bg-[#d5dae3] min-h-dvh flex items-center justify-center">
      <div className="card bg-[#f6f5f9] w-xs max-w-md p-6 rounded-xl shadow-md">
        <div className="flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">TaskFlow</h1>
          <span className="text-">Pro</span>
        </div>

        <div className="flex flex-col items-center ">
          <form onSubmit={handleSubmit}>
            <div className="text-[#9da2aa] mt-8 mb-2">Name</div>

            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              error={error.name}
            />

            <div className="text-[#9da2aa] mb-2">Email</div>
            <Input
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              error={error.email}
            />

            <div className="text-[#9da2aa] mb-2">Password</div>

            <Input
              type="text"
              placeholder="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              error={error.password}
            />

            <button className="border border-blue-[#246ee1] bg-[#246ee1] my-2 w-full text-amber-50 p-1 rounded-md">
              Register
            </button>
          </form>
        </div>
        <div className=" mt-2 flex items-center gap-3">
          <hr className=" flex-1 border-t border-gray-300  "></hr>
          <span className="text-gray-500 text-sm">or</span>
          <hr className=" flex-1 border-t border-gray-300 "></hr>
        </div>

        <div className="flex justify-center mt-3 mb-5">
          <span className="text-gray-500 text-xs">
            {" "}
            Already have an account?{" "}
            <Link className="text-blue-600" to="/login">
              Sign In
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

// 🧠 Why this works
// flex → enables layout control
// justify-center → center horizontally
// items-center → center vertically
// No margin hacks needed ✅
