// src/pages/Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/actions/authActions";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loading, error } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));

        if (loginUser.fulfilled.match(result)) {
            toast.success("Login successful!");
            navigate("/dashboard");
        } else {
            toast.error(result.payload || "Login failed");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100 bg-light"
        >
            <div
                className="p-4 shadow-sm rounded bg-white"
                style={{ width: "100%", maxWidth: "400px", border: "1px solid #eee" }}
            >
                <h3 className="mb-4 text-center">Admin Login</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-3">
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>

                    <button
                        className="btn btn-primary w-100 py-2"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {error && <p className="text-danger mt-3 text-center">{error}</p>}
            </div>
        </div>
    );
}
