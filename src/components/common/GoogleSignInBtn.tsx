import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { createUserProfile } from "../../api/firestore";

export function GoogleSignInBtn() {
  async function signInWithGoogle(): Promise<void> {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      if (getAdditionalUserInfo(userCredentials)?.isNewUser) {
        await createUserProfile(
          userCredentials.user.uid,
          userCredentials.user.email,
          userCredentials.user.displayName,
          userCredentials.user.photoURL
        );
      }
    } catch (e) {
      console.error(
        "Error while using google provider: ",
        (e as Error).message
      );
    }
  }

  return (
    <button className="register__button button" onClick={signInWithGoogle}>
      Sign up with Google
    </button>
  );
}
