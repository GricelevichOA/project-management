import {
  getProject,
  getProjectTasks,
  getProjects,
  getUserProfile,
} from "../api/firestore";
import { actions } from "../store";
import { CurrentProject } from "../utils/types";

export async function setProjectsAction(dispatch: any): Promise<void> {
  dispatch(actions.projects.isLoadingStart());
  const projects = await getProjects();
  dispatch(actions.projects.setProjects(projects));
  dispatch(actions.projects.isLoadingEnd());
}

export async function setCurrentProjectAction(
  dispatch: any,
  id: string
): Promise<void> {
  dispatch(actions.projects.isLoadingStart());
  const project = await getProject(id);
  const tasks = await getProjectTasks(id);
  const projectOwner = await getUserProfile(project.user_id);

  const currentProject = {
    projectData: project,
    projectOwner: projectOwner,
    projectTasks: tasks,
  } as CurrentProject;

  dispatch(actions.projects.setCurrentProject(currentProject));
  dispatch(actions.projects.isLoadingEnd());
}

export function clearCurrentProjectAction(dispatch: any): void {
  dispatch(actions.projects.clearCurrentProject());
}
