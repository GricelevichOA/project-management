import {
  getUserProfiles,
  getUserProjects,
  getUserTasks,
} from "../api/firestore";
import { actions } from "../store";

// TODO: избавиться от any
export function setCurrentUserAction(dispatch: any, user: any): void {
  dispatch(actions.users.setCurrentUser(user));
}

export function clearUserDataAction(dispatch: any): void {
  dispatch(actions.users.clearUserData());
}

export async function setUserProfilesAction(dispatch: any) {
  dispatch(actions.users.isLoadingStart());
  const users = await getUserProfiles();
  dispatch(actions.users.setUsers(users));
  dispatch(actions.users.isLoadingEnd());
}

export async function setUserProjectsAction(dispatch: any, user: string) {
  dispatch(actions.users.isLoadingStart());
  const projects = await getUserProjects(user);
  const tasks = await getUserTasks(user);
  const result = {
    projects,
    tasks,
  };
  dispatch(actions.users.setUserProjects(result));
  dispatch(actions.users.isLoadingEnd());
}
