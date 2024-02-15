import { db } from "../config/firebase";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { ProjectType, Task, UserProfile } from "../utils/types";

// поправить типы
// ДОБАВИТЬ ВОЗВРАЩАЕМЫЕ ТИПЫ ДЛЯ ФУНКЦИЙ
// USERS
export async function setUserProfile(
  userProfile: UserProfile
): Promise<boolean> {
  try {
    const profilesRef = doc(db, "users", userProfile.id);
    await setDoc(profilesRef, {
      avatar_url: userProfile.avatar_url,
      username: userProfile.username,
      email: userProfile.email,
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
      const userData = { id: userSnap.id, ...userSnap.data() };
      return userData;
    }
  } catch (e) {
    console.error("Error while fetching user profile: ", (e as Error).message);
    return false;
  }
}

// TODO:
export async function deleteUserProfile(uid: string) {
  try {
    const userRef = doc(db, "users", uid);
    await deleteDoc(userRef);
    return true;
  } catch (e) {
    console.error(e);
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
    return filteredProfiles;
  } catch (e) {
    console.error("Error while fetching users: ", (e as Error).message);
    return false;
  }
}

// PROJECTS
// TODO: отформатировать
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

export async function getUserProjects(userId: string): Promise<any> {
  try {
    const projectsRef = collection(db, "projects");
    const q = query(projectsRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return filteredData;
  } catch (e) {
    console.error("Error while fetching projects");
    return false;
  }
}

// TODO: избавиться от any и отформатировать
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
    const projectRef = doc(db, "projects", project.id);
    await setDoc(projectRef, project);
    return true;
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

// TASKS
export async function getTasks() {
  try {
    const tasksSnap = await getDocs(collection(db, "tasks"));
    const filteredTasks = tasksSnap.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return filteredTasks;
  } catch (e) {
    console.error("Error while fetching tasks: ", (e as Error).message);
    return false;
  }
}

export async function getProjectTasks(projectId: string) {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("project_id", "==", projectId));
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return filteredData;
  } catch (e) {
    console.error("Error while fetching tasks: ", (e as Error).message);
    return false;
  }
}

export async function getUserTasks(userId: string) {
  try {
    const tasksRef = collection(db, "tasks");
    const q = query(tasksRef, where("assignee", "==", userId));
    const querySnapshot = await getDocs(q);
    const filteredData = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return filteredData;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export async function setTask(task: Task) {
  try {
    const taskRef = doc(db, "tasks", task.id);
    await setDoc(taskRef, task);
    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}

// TODO:
export async function updateTask(task: Task) {}

// TODO:
export async function updateTaskStatus(task: Task, newStatus: string) {}

export async function deleteTask(taskId: string) {}
