import { actions } from "../store";

// TODO: избавиться от any
export async function setCurrentUserAction(
  dispatch: any,
  user: any
): Promise<void> {
  dispatch(actions.users.setCurrentUser(user));
}

export async function clearUserDataAction(
  dispatch: any
): Promise<void> {
  dispatch(actions.users.clearUserData())
}

export async function createUserProfileAction(dispatch: any, id: string) {
  // TODO: сделать создание профиля юзера при регистрации
}

export async function getUserProfileAction(dispatch: any, id: string) {
  // TODO: сделать получение профиля при логине
}
