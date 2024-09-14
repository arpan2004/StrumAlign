import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FIREBASE_AUTH } from "../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = FIREBASE_AUTH;

  const handleRegistration = async () => {
    if (password !== passwordConfirm) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create a new user
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      alert("Registration successful!");
      navigate("/record");
    } catch (err) {
      console.error(err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}
      <button
        onClick={handleRegistration}
        style={loading ? { ...styles.button, ...styles.buttonDisabled } : styles.button}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f5f5f5',
    height: '100vh',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  input: {
    height: '50px',
    borderColor: '#ddd',
    borderWidth: '1px',
    marginBottom: '15px',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#fff',
    fontSize: '16px',
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: '15px',
    textAlign: 'center',
    fontSize: '14px',
  },
  button: {
    backgroundColor: '#6200ee',
    padding: '15px',
    borderRadius: '10px',
    color: '#fff',
    fontSize: '16px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  buttonDisabled: {
    backgroundColor: '#9e9e9e',
  },
};

export default Register;