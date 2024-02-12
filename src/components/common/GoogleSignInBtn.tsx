import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../config/firebase";
import { setUserProfile } from "../../api/firestore";
import { Button } from "@mui/material";
import { UserProfile } from "../../utils/types";

export function GoogleSignInBtn() {
  async function signInWithGoogle(): Promise<void> {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider);
      if (getAdditionalUserInfo(userCredentials)?.isNewUser) {
        const newUserProfile = {
          id: userCredentials.user.uid,
          email: userCredentials.user.email,
          username: userCredentials.user.displayName,
          avatar_url: userCredentials.user.photoURL,
        } as UserProfile;
        await setUserProfile(newUserProfile);
      }
    } catch (e) {
      console.error(
        "Error while using google provider: ",
        (e as Error).message
      );
    }
  }

  return (
    <Button variant="outlined" onClick={signInWithGoogle}>
      Sign up with Google
    </Button>
  );
}
