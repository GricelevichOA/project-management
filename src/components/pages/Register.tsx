import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUserAction, setUserProfilesAction } from "../../actions";
import { GoogleSignInBtn } from "../common/GoogleSignInBtn";
import { setUserProfile } from "../../api/firestore";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { UserProfile } from "../../utils/types";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  async function signUp(): Promise<void> {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUserAction(dispatch, auth?.currentUser);
      const newUserProfile = {
        id: userCredentials.user.uid,
        username: username,
        email: userCredentials.user.email,
        avatar_url: `https://i.pravatar.cc/150?u=${email}`,
      } as UserProfile;
      await setUserProfile(newUserProfile);
      await setUserProfilesAction(dispatch);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error("Error: ", (e as Error).message);
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
              Sign up
            </Typography>
            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                label="Email"
                id="register_email"
                className="register__input input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                variant="outlined"
                label="Password"
                id="register_password"
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
                onClick={signUp}
              >
                Sign Up
              </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
              <GoogleSignInBtn />
            </Box>
            <Box>
              <Typography variant="caption">
                Already have an account <Link to="/login">Sign in</Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </>
  );
}
