import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/auth";
import { TextField, Button } from "@mui/material";

const Register = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { register, user } = useAuth();

  useEffect(() => {
    if (user.userId) navigate("/my-routes");
    // eslint-disable-next-line
  }, [user]);

  return (
    <div>
      <TextField variant="filled" onChange={(e) => setUsername(e.target.value)} />
      <Button onClick={() => register(username)} variant="contained" size="small">
        Register
      </Button>
    </div>
  );
};

export default Register;
