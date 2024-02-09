import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase";
import { useDispatch } from "react-redux";
import { setCurrentUserAction } from "../../actions";
import { GoogleSignInBtn } from "../common/GoogleSignInBtn";
import { createUserProfile } from "../../api/firestore";

export function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
      await createUserProfile(
        userCredentials.user.uid,
        userCredentials.user.email,
        "New User",
        ""
      );
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
          <input
            id="register_email"
            className="register__input input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            id="register_password"
            className="register__input input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="register__button button" onClick={signUp}>
            Sign up
          </button>
          <GoogleSignInBtn />
        </div>
        <div>
          Already have an account? <Link to="/login">Sign in</Link>
        </div>
      </div>
    </>
  );
}
