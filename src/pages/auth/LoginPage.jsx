import React, { useRef, useState } from "react";
import PasswordInput from "../../components/login/PasswordInput";
import "./loginPage.css";

function LoginPage() {
  const [error, setError] = useState("");
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    // Regex patterns
    const usernameRegex = /^[a-zA-Z0-9_]{3,16}$/;
    const emailRegex = /^.+@.+\..+$/;
    const passwordRegex = /^.{6,}$/;

    if (!username || !email || !password) {
      setError("Please enter username, email, and password.");
      return;
    }
    if (!usernameRegex.test(username)) {
      setError("Username must be 3-16 characters, letters, numbers, or underscores.");
      return;
    }
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters.");
      return;
    }
    // Simulate login logic
    if (username === "admin" && email === "admin@example.com" && password === "password") {
      setError("");
      // Redirect or set auth state here
      alert("Login successful!");
    } else {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-box" onSubmit={handleLogin}>
        <div className="login-title">Login</div>
        <input
          ref={usernameRef}
          className="login-input"
          type="text"
          placeholder="Username"
          autoComplete="username"
        />
        <input
          ref={emailRef}
          className="login-input"
          type="email"
          placeholder="Email"
          autoComplete="email"
        />
        <PasswordInput
          ref={passwordRef}
          placeholder="Password"
          autoComplete="current-password"
        />
        <div className="login-error">{error}</div>
        <button className="login-btn" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
