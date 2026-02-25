// Login.jsx
import { useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await login(form.email, form.password);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white">
            <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Form section */}
                <div className="w-full md:w-1/2 bg-white p-10 order-2 md:order-1">
                    <h2 className="text-3xl font-bold mb-8">log In</h2>
                    <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off">
                        <div>
                            <label className="text-xs text-gray-500">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address..."
                                className="w-full mt-1 px-0 py-3 border-b focus:outline-none text-sm"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password..."
                                className="w-full mt-1 px-0 py-3 border-b focus:outline-none text-sm"
                                value={form.password}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                        </div>
                        {error && (
                            <div className="text-sm text-red-500 mt-2">{error}</div>
                        )}
                        <div className="flex items-center justify-between mt-6">
                            <button
                                type="submit"
                                className="bg-[--second-color] cursor-pointer text-white px-8 py-2 rounded-full font-semibold shadow hover:brightness-105 transition"
                            >
                                Login
                            </button>
                            <Link
                                to="/register"
                                className="text-gray-700 font-semibold text-sm hover:underline"
                            >
                                Sign up →
                            </Link>
                        </div>
                    </form>
                </div>
                {/* Image section, right side on md+ */}
                <div className="hidden md:block md:w-1/2 relative order-1 md:order-2">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('./singup.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-l from-purple-500 to-pink-400 opacity-80"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;