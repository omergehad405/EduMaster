// Register.jsx
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate, Link, useLocation } from "react-router-dom";

const Register = () => {
    const { register, loading } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        repassword: "",
        agree: false,
        avatar: null,
    });
    const [error, setError] = useState("");
    const [preview, setPreview] = useState(null);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === "checkbox") {
            setForm((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else if (type === "file") {
            const file = files[0];
            setForm((prev) => ({
                ...prev,
                avatar: file,
            }));
            setPreview(file ? URL.createObjectURL(file) : null);
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.agree) return setError("You must agree to the Terms of Use.");
        if (form.password !== form.repassword) return setError("Passwords do not match.");

        // Pass plain values, NOT a FormData object
        const result = await register(form.username, form.password, form.email, form.avatar);

        if (result.success) {
            navigate("/");
        } else {
            setError(result.message);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-white">
            <div className="flex w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
                {/* Left image section - you add the photo as needed */}
                <div className="hidden md:block md:w-1/2 relative">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url('./singup.jpg')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-400 opacity-80"></div>
                    </div>
                </div>
                {/* Form section */}
                <div className="w-full md:w-1/2 bg-white p-10">
                    <h2 className="text-3xl font-bold mb-8">Sign Up</h2>
                    <form
                        className="space-y-5"
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        encType="multipart/form-data"
                    >
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
                            <label className="text-xs text-gray-500">Username</label>
                            <input
                                type="text"
                                name="username"
                                placeholder="Username..."
                                className="w-full mt-1 px-0 py-3 border-b focus:outline-none text-sm"
                                value={form.username}
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
                        <div>
                            <label className="text-xs text-gray-500">Repeat Password</label>
                            <input
                                type="password"
                                name="repassword"
                                placeholder="Repeat Password..."
                                className="w-full mt-1 px-0 py-3 border-b focus:outline-none text-sm"
                                value={form.repassword}
                                onChange={handleChange}
                                required
                                autoComplete="off"
                            />
                        </div>
                        {/* Avatar upload field with style */}
                        <div>
                            <label className="text-xs text-gray-500 block mb-2">
                                Avatar Image
                                <span className="ml-1 text-gray-300 text-xs font-normal">(optional)</span>
                            </label>
                            <div className="flex items-center space-x-4">
                                <label className="relative cursor-pointer flex items-center justify-center w-20 h-20 border border-gray-200 rounded-full bg-gray-50 hover:shadow-md transition">
                                    <input
                                        type="file"
                                        name="avatar"
                                        accept="image/*"
                                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                                        onChange={handleChange}
                                    />
                                    {preview ? (
                                        <img
                                            src={preview}
                                            alt="Avatar Preview"
                                            className="h-20 w-20 rounded-full object-cover border"
                                        />
                                    ) : (
                                        <svg
                                            className="w-10 h-10 text-gray-300"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16.5 7.5A4.5 4.5 0 1 1 7.5 7.5a4.5 4.5 0 0 1 9 0zm-13.125 13A13 13 0 0 1 12 18.75a13 13 0 0 1 8.625 1.75M9 11.25a3 3 0 1 1 6 0 3 3 0 0 1-6 0z"
                                            />
                                        </svg>
                                    )}
                                </label>
                                {preview && (
                                    <button
                                        type="button"
                                        className="text-xs text-red-400 underline focus:outline-none"
                                        onClick={() => {
                                            setForm((prev) => ({ ...prev, avatar: null }));
                                            setPreview(null);
                                        }}
                                    >
                                        Remove
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <input
                                type="checkbox"
                                id="agree"
                                name="agree"
                                checked={form.agree}
                                onChange={handleChange}
                                className="mr-2"
                                required
                            />
                            <label htmlFor="agree" className="text-xs text-gray-500 select-none">
                                I agree to the <span className="text-purple-500 font-semibold cursor-pointer">Terms of Use</span>
                            </label>
                        </div>
                        {error && (
                            <div className="text-sm text-red-500 mt-2">{error}</div>
                        )}
                        <div className="flex items-center justify-between mt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-(--second-color) cursor-pointer text-white px-8 py-2 rounded-full font-semibold shadow hover:brightness-105 transition disabled:opacity-50"
                            >
                                {loading ? "Creating account..." : "Sign Up"}
                            </button>
                            <Link
                                to="/login"
                                className="text-gray-700 font-semibold text-sm hover:underline"
                            >
                                Sign in →
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;