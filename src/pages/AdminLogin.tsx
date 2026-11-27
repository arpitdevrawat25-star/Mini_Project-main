import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminLogin.scss";
import { useCareer } from "../CarrierContext";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { saveProfile } = useCareer();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.ok) {
        saveProfile(
          data.name,
          data.education,
          data.intrest,
          data.experience,
          data.skills,
        );
        localStorage.setItem("isAdmin", "true");
        navigate("/admin/dashboard");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      setError("Cannot reach the server. Is Flask running?");
    }
  };

  return (
    <div className="login-page-1">
      <div className="login-page-1-wrapper">
        <article>
          <header>Admin Login</header>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.35rem" }}
          >
            <label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
            <label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
            <section>
              <button type="submit">Login</button>
            </section>
            {error && (
              <p style={{ color: "#ffd1d1", textAlign: "center", margin: 0 }}>
                {error}
              </p>
            )}
          </form>
        </article>
        <div className="login-page-1-drops">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
