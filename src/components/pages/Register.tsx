import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUserAction } from "../../actions";
import { GoogleSignInBtn } from "../common/GoogleSignInBtn";
import { setUserProfile } from "../../api/firestore";
import { Button, TextField } from "@mui/material";
import { UserProfile } from "../../utils/types";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  // TODO: избавиться от any
  const dispatch = useDispatch();

  async function signUp(): Promise<void> {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setCurrentUserAction(dispatch, auth?.currentUser);
      // TODO: СДЕЛАТЬ ДЕФОЛТНУЮ КАРТИНКУ ДЛЯ АВАТАРА
      const newUserProfile = {
        id: userCredentials.user.uid,
        username: username,
        email: userCredentials.user.email,
        avatar_url: "",
      } as UserProfile;
      await setUserProfile(newUserProfile);
      setEmail("");
      setPassword("");
    } catch (e) {
      console.error("Error: ", (e as Error).message);
    }
  }

  return (
    <>
      <div className="register">
        <h2 className="register__title">Sign up</h2>
        <div className="register__form">
          <TextField
            variant="outlined"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="Email"
            id="register_email"
            className="register__input input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            label="password"
            id="register_password"
            className="register__input input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button variant="contained" onClick={signUp}>
            Sign Up
          </Button>

          <GoogleSignInBtn />
        </div>
        <div>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </>
  );
}
