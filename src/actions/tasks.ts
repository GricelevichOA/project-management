import { getTasks } from "../api/firestore";
import { actions } from "../store";

export async function setTasksAction(dispatch: any) {
  dispatch(actions.tasks.isLoadingStart());
  const tasks = await getTasks();
  dispatch(actions.tasks.setTasks(tasks));
  dispatch(actions.tasks.isLoadingEnd());
}
