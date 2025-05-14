import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import api from "../utils/api";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        email,
        password,
      });

      const token = response.data.token;
      console.log("Signup successful. Token:", token);

      // Save token (optional)
      localStorage.setItem("token", token);

      // Redirect to login or home
      navigate("/");
    } catch (err) {
      if (err.response?.status === 409) {
        setError("Email already registered.");
      } else {
        setError("Signup failed. Try again.");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} p={4} boxShadow={3} borderRadius={2}>
        <Typography variant="h4" mb={2} textAlign="center">Sign Up</Typography>

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
          onClick={handleSignup}
        >
          Sign Up
        </Button>

        <Typography mt={2} textAlign="center">
          Already have an account?{" "}
          <Link onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default SignupPage;
