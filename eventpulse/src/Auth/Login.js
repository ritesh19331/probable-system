import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Alert,
  Link,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; // Make sure this points to your axios.js
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState(""); // Backend expects "email"
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        email,
        password,
      });

      const token = response.data.token;
      const userId = response.data.user.id;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      // Redirect to home/dashboard
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" mb={2} textAlign="center">
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography mt={2} textAlign="center">
          Don’t have an account?{" "}
          <Link onClick={() => navigate("/signup")} sx={{ cursor: "pointer" }}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default LoginPage;
