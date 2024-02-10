// TODO: избавиться от any

import { Dispatch } from "react";
import { getProject, getProjects } from "../api/firestore";
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
