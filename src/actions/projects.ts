// TODO: избавиться от any

import { Dispatch } from "react";
import {
  getProject,
  getProjectTasks,
  getProjects,
  getUserProfile,
} from "../api/firestore";
import { actions } from "../store";
import { UnknownAction } from "redux";

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
  dispatch(actions.projects.setCurrentProject(project));
  dispatch(actions.projects.isLoadingEnd());
}

export function clearCurrentProjectAction(dispatch: any): void {
  dispatch(actions.projects.clearCurrentProject());
}

export async function setProjectTasksAction(dispatch: any, projectId: string) {
  dispatch(actions.projects.isLoadingStart());
  const tasks = await getProjectTasks(projectId);
  dispatch(actions.projects.setProjectTasks(tasks));
  dispatch(actions.projects.isLoadingEnd());
}

export function clearProjectTasksAction(dispatch: any): void {
  dispatch(actions.projects.clearProjectTasks());
}

export async function setProjectCreatorAction(dispatch: any, userId: string) {
  dispatch(actions.projects.isLoadingStart());
  const user = await getUserProfile(userId);
  dispatch(actions.projects.setProjectCreator(user));
  dispatch(actions.projects.isLoadingEnd());
}

export function clearProjectCreatorAction(dispatch: any) {
  dispatch(actions.projects.clearProjectCreator());
}
