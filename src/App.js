import React, { useState, useEffect } from "react";
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";

function App() {
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));
  const [username, setUsername] = useState(localStorage.getItem("username"));
  const [isAuth, setIsAuth] = useState(!!localStorage.getItem("username"));

  useEffect(() => {
    const handleStorageChange = () => {
      const userId = localStorage.getItem("user_id");
      const username = localStorage.getItem("username");
      const auth = !!username;
      setIsAuth(auth);
      setUserId(userId);
      setUsername(username);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div>
      {isAuth ? <Dashboard userId={userId} username={username} /> : <Welcome />}
    </div>
  );
}

export default App;
