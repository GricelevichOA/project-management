import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleSignInBtn } from "../common/GoogleSignInBtn";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(): Promise<void> {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error("Error while logging in: ", (e as Error).message);
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center ",
          alignItems: "center",
          flex: "1 1",
        }}
      >
        <Card
          sx={{ maxWidth: 400, alignSelf: "center", justifySelf: "center" }}
        >
          <CardContent>
            <Typography variant="h3" sx={{ textAlign: "center", mb: 2 }}>
              Sign in
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                label="Password"
                id="register_email"
                className="register__input input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button
                sx={{ width: "100%" }}
                variant="contained"
                onClick={signIn}
              >
                Sign in
              </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
              <GoogleSignInBtn />
            </Box>
            <Box>
              <Typography variant="caption">
                Dont have an account? <Link to="/register">Sign up</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
