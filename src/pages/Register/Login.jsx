// Login.jsx
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const result = await login(form.email, form.password);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className=" w-full flex items-center justify-center bg-(--bg-color)">
            <div className="flex w-full max-w-4xl bg-(--bg-color) shadow-lg rounded-lg overflow-hidden">
                {/* Left image (on desktop, hidden on mobile) - matches Register.jsx */}
                <div className="hidden lg:block md:w-1/2 relative">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('./singup.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 bg-linear-to-r from-purple-500 to-pink-400 opacity-80"></div>
                    </div>
                </div>
                {/* Form section */}
                <div className="w-full lg:w-1/2 p-10">
                    <h2 className="text-3xl font-bold mb-8 text-(--text-color)">Log In</h2>
                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                    >
                        <div>
                            <label className="text-xs text-(--p-color)">Email</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email address..."
                                className="w-full mt-1 px-0 py-3 border-b focus:outline-none text-sm bg-transparent text-(--text-color)"
                                value={form.email}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-(--p-color)">Password</label>
                            <input
                                type="password"
                                name="password"
                                placeholder="Password..."
                                className="w-full mt-1 px-0 py-3 border-b focus:outline-none text-sm bg-transparent text-(--text-color)"
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
                                className="bg-(--second-color) cursor-pointer text-(--text-color) px-8 py-2 rounded-full font-semibold shadow hover:brightness-105 transition disabled:opacity-50"
                            >
                                Login
                            </button>
                            <Link
                                to="/register"
                                className="text-(--p-color) font-semibold text-sm hover:underline"
                            >
                                Sign up →
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;