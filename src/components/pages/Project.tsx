import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ProjectType } from "../../utils/types";
import { useEffect } from "react";
import {
  clearCurrentProjectAction,
  setCurrentProjectAction,
} from "../../actions";

export function Project() {
  const params = useParams();
  const projectId = params.id;

  // TODO: get rid of any
  const projects = useSelector((state: any) => state.projects);
  const project: ProjectType = projects.currentProject;
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      await setCurrentProjectAction(dispatch, projectId || "");
    };
    load();

    return () => {
      clearCurrentProjectAction(dispatch);
    };
  }, []);

  return (
    <>
      <div className="project">
        <Link to={`/projects/${projectId}/edit`} >Edit project</Link>
        <div className="project__info">
          <h2 className="project__title">{project?.title}</h2>
          <h3 className="project__author">Created by: {project?.user_id}</h3>
          <div className="project__status">
            Current status: {project?.status}
          </div>
          <time dateTime={project?.created_at}>
            Created at: {project?.created_at}
          </time>
          <time dateTime={project?.updated_at}>
            Updated at: {project?.updated_at}
          </time>
          <div className="project__description">Description: {project?.description}</div>
        </div>
        <div className="project__tasks">
          <h2>Current tasks: </h2>
        </div>
      </div>
    </>
  );
}
