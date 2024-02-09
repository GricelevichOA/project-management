import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { clearUserDataAction } from "../actions";

// TODO: пофиксить any
export async function logOut(dispatch: any): Promise<void> {
  try {
    await signOut(auth);
    clearUserDataAction(dispatch);
  } catch (e) {
    console.error("Error while logout", (e as Error).message);
  }
}
