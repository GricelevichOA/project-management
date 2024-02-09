import { useState } from "react";
import { Link } from "react-router-dom";
import { GoogleSignInBtn } from "../common/GoogleSignInBtn";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function signIn(): Promise<void> {
    // TODO: implement login logic
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
      <div className="register">
        <h2 className="register__title">Sign in</h2>
        <div className="register__form">
          <input
            className="register__input input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="register__input input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="register__button button" onClick={signIn}>
            Sign in
          </button>
          <GoogleSignInBtn />
        </div>
        <div>
          Dont have an account? <Link to="/register">Sign up</Link>
        </div>
      </div>
    </>
  );
}
