import { db } from "../config/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";

// поправить типы
export async function createUserProfile(
  id: string,
  email: string | null,
  username: string | null,
  avatar_url: string | null
): Promise<boolean> {
  try {
    const profilesRef = doc(db, "users", id);
    await setDoc(profilesRef, {
      avatar_url,
      username,
      email,
    });

    return true;
  } catch (e) {
    console.error("Error while adding a user", (e as Error).message);
    return false;
  }
}

export async function getUserProfile(uid: string) {
  try {
    const profileRef = doc(db, "users", uid);
    const userSnap = await getDoc(profileRef);

    if (userSnap.exists()) {
      const userData = { uid: userSnap.id, ...userSnap.data() };
      return userData;
    }
  } catch (e) {
    console.error("Error while fetching user profile: ", (e as Error).message);
    return false;
  }
}

export async function getUserProfiles() {
  try {
    const profilesRef = collection(db, "users");
    const profilesSnap = await getDocs(profilesRef);

    const filteredProfiles = profilesSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("filtered profiles", filteredProfiles);
    return filteredProfiles;
  } catch (e) {
    console.error("Error while fetching users: ", (e as Error).message);
  }
}
