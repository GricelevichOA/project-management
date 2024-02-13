import { getUserProfiles } from "../api/firestore";
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

export async function createUserProfileAction(dispatch: any, id: string) {
  // TODO: сделать создание профиля юзера при регистрации
}

export async function getUserProfileAction(dispatch: any, id: string) {
  // TODO: сделать получение профиля при логине
}
