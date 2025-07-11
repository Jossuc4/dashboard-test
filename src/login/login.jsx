import React, { useState } from "react";
import "./Login.css";
import { loginUser } from "../api/auth";

function Login() {
    const [user, setUser] = useState("");
    const [pwd, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
          const data = await loginUser(user, pwd);
          alert("vous êtes connecté...");
        } catch (err) {
          setError(err);
        }
      };

  return (
    <div id="a">
        <form onSubmit={handleSubmit}>
        <div>
                <h1>Authentification</h1>
                {error && <p style={{ color: "red" }}>{error}</p>}
            <label>Username:</label>
            <input placeholder="Username" 
            type="text"
            value={user}
            required
            onChange={(e) => setUser(e.target.value)}
            />
        </div>
        <div>
            <label>Password:</label>
            <input placeholder="*******" 
            type="password"
            value={pwd}
            required
            onChange={(e) => setPassword(e.target.value)}
            />
        </div>
        <br />
            <button type="submit">Login</button>
            <br />
        </form>
    </div>
  );
}

export default Login;
