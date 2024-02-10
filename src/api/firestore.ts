import { db } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { NewProject, ProjectType } from "../utils/types";

// поправить типы
// ДОБАВИТЬ ВОЗВРАЩАЕМЫЕ ТИПЫ ДЛЯ ФУНКЦИЙ
// USERS
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
    return false;
  }
}

// PROJECTS
export async function getProjects(): Promise<boolean | Array<ProjectType>> {
  try {
    const projectsRef = collection(db, "projects");
    const projectsSnap = await getDocs(projectsRef);
    const filteredProjects = projectsSnap.docs.map((doc: any) => {
      const data = {
        id: doc.id,
        ...doc.data(),
      };
      return {
        id: data.id,
        title: data.title,
        description: data.description,
        user_id: data.user_id,
        status: data.status,
        created_at: data.created_at,
        updated_at: data.updated_at,
      };
    });
    return filteredProjects;
  } catch (e) {
    // ЗАКИДЫВАТЬ ОШИБКУ В СТОР
    console.error("Error while fetching projects", (e as Error).message);
    return false;
  }
}

// TODO: избавиться от any
export async function getProject(
  id: string
): Promise<ProjectType | boolean | any> {
  try {
    const projectSnap = await getDoc(doc(db, "projects", id));
    if (projectSnap.exists()) {
      const projectData = {
        id: projectSnap.id,
        ...projectSnap.data(),
      } as ProjectType;
      return {
        id: projectData.id,
        title: projectData.title,
        description: projectData.description,
        user_id: projectData.user_id,
        status: projectData.status,
        created_at: projectData.created_at,
        updated_at: projectData.updated_at,
      };
    }
  } catch (e) {
    return false;
  }
}

export async function createProject(
  project: any
): Promise<boolean | undefined> {
  try {
    if (project.id) {
      const projectRef = doc(db, "projects", project.id);
      await setDoc(projectRef, project);
      return true;
    }
  } catch (e) {
    console.error("error creating project", (e as Error).message);
    return false;
  }
}

export async function deleteProject(id: string) {
  try {
    const docRef = doc(db, "projects", id);
    await deleteDoc(docRef);
    return true;
  } catch (e) {
    console.error("error while deleting project", (e as Error).message);
    return false;
  }
}

// export async function createUserProfile(
//   id: string,
//   email: string | null,
//   username: string | null,
//   avatar_url: string | null
// ): Promise<boolean> {
//   try {
//     const profilesRef = doc(db, "users", id);
//     await setDoc(profilesRef, {
//       avatar_url,
//       username,
//       email,
//     });

//     return true;
//   } catch (e) {
//     console.error("Error while adding a user", (e as Error).message);
//     return false;
//   }
// }

// TASKS
export async function getTasks() {
  try {
    const tasksSnap = await getDocs(collection(db, "tasks"));
    const filteredTasks = tasksSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log("filtered tasks", filteredTasks);
    return filteredTasks;
  } catch (e) {
    console.error("Error while fetching tasks: ", (e as Error).message);
    return false;
  }
}

export async function getProjectTasks(projectId: string) {
  try {
  } catch (e) {
    console.error("Error while fetching tasks: ", (e as Error).message);
    return false;
  }
}
