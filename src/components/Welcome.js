import React, { useState } from "react";
import { Container, Typography, TextField, Button, Box } from "@mui/material";
import axios from "axios";

function Welcome() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  const login = (userId, username) => {
    localStorage.setItem("user_id", userId);
    localStorage.setItem("username", username);
    window.dispatchEvent(new Event("storage"));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = isLogin
        ? await axios.post("http://localhost:8001/user/login", {
            email,
            password,
          })
        : await axios.post("http://localhost:8001/user/register", {
            email,
            password,
          });
      const { username, userId } = response.data;
      login(userId, username);
    } catch (err) {
      setError(err.response ? err.response.data : "An error occurred");
    }
  };

  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "50px" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {isLogin ? "Sign In" : "Sign Up"} to URL Rating App
      </Typography>
      <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          {isLogin ? "Sign In" : "Sign Up"}
        </Button>
        <Button
          fullWidth
          color="secondary"
          style={{ marginTop: "10px" }}
          onClick={toggleForm}
        >
          {isLogin ? "Need an account? Sign Up" : "Have an account? Sign In"}
        </Button>
      </Box>
    </Container>
  );
}

export default Welcome;
