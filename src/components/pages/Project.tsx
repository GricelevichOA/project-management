import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ProjectType, Task, UserProfile } from "../../utils/types";
import { useEffect, useState } from "react";
import {
  clearCurrentProjectAction,
  clearProjectCreatorAction,
  clearProjectTasksAction,
  setCurrentProjectAction,
  setProjectCreatorAction,
  setProjectTasksAction,
} from "../../actions";
import { Button, CircularProgress } from "@mui/material";
import { TaskCard } from "../common/TaskCard";
import { v4 as uuid4 } from "uuid";
import { TaskStatus } from "../../utils/enums";
import { createTask, getProjectTasks } from "../../api/firestore";
import { CreateTask } from "./CreateTask";

export function Project() {
  const params = useParams();
  const projectId = params.id;

  // TODO: get rid of any
  const projects = useSelector((state: any) => state.projects);
  const project: ProjectType = projects.currentProject;
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [projectCreator, setProjectCreator] = useState<UserProfile | null>(
    null
  );

  useEffect(() => {
    const load = async () => {
      await setCurrentProjectAction(dispatch, projectId || "");
      await setProjectTasksAction(dispatch, projectId || "");

      setProjectCreator(
        users.allUsers.find(
          (user: UserProfile) => user?.id === project?.user_id
        )
      );
    };
    load();

    return () => {
      clearCurrentProjectAction(dispatch);
      clearProjectTasksAction(dispatch);
    };
  }, []);

  return (
    <>
      {projects.isLoading ? (
        <CircularProgress />
      ) : (
        <div className="project">
          <Link to={`/projects/${projectId}/edit`}>Edit project</Link>
          <div className="project__info">
            <h2 className="project__title">{project?.title}</h2>
            <h3 className="project__author">
              Created by: {projectCreator?.username}
            </h3>
            <div className="project__status">
              Current status: {project?.status}
            </div>
            <time>Created at: {new Date(project?.created_at).toString()}</time>
            <time>Updated at: {new Date(project?.updated_at).toString()}</time>
            <div className="project__description">
              Description: {project?.description}
            </div>
          </div>
          <div className="project__tasks">
            <h2>Current tasks: </h2>
            <Button variant="outlined" onClick={() => setIsCreatingTask(true)}>
              Create task
            </Button>
            {isCreatingTask ? <CreateTask /> : ""}
            <div>
              {projects.projectTasks.map((task: Task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>

            <button
              onClick={async () => {
                const newTask: Task = {
                  id: uuid4(),
                  title: "testTask",
                  description:
                    "loremdasdkojsac njsancmskaljd cjklasdj asdnndakslhdasdlasdhasdsla",
                  project_id: project?.id,
                  date_started: Date.now(),
                  due_date: Date.now(),
                  status: TaskStatus.created,
                  assignee: "Og7yf9DCr2RDr4pl335VO4JiF0t2",
                };
                await createTask(newTask);
                await setProjectTasksAction(dispatch, project?.id);
              }}
            >
              create test task
            </button>
          </div>
        </div>
      )}
    </>
  );
}
