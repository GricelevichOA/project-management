export type ProjectType = {
  id: string;
  title: string;
  description: string;
  user_id: string;
  status: string;
  created_at: number;
  updated_at: number | null;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  project_id: string;
  date_started: number;
  assignee: string;
  status: string;
};

export type TasksState = {
  isLoading: boolean;
  items: Task[];
};

export type NewTaskFormProps = {
  projectId: string;
};

export type ProjectsState = {
  items: Array<ProjectType>;
  currentProject: CurrentProject | null;
  isLoading: boolean;
  error: string | null;
};

export type CurrentProject = {
  projectData: ProjectType | null;
  projectTasks: Task[] | null;
  projectOwner: UserProfile | null;
};

export type NewProject = {
  title: string;
  description: string;
  user_id: string;
  status: string;
  created_at: number;
  updated_at: number;
};

export type Props = {
  children: string | JSX.Element | JSX.Element[];
};

export type TaskCardProps = {
  task: Task;
};

export type UserProfile = {
  id: string;
  avatar_url: string;
  email: string;
  username: string;
};

export type UsersState = {
  currentUser: UserProfile | null;
  allUsers: UserProfile[];
  isLoading: boolean;
  currentUserProjects: CurrentUserProjects | null;
};

type CurrentUserProjects = {
  projects: ProjectType[];
  tasks: Task[];
};

export type ProjectCardProps = {
  project: ProjectType;
};

export type TaskBlockProps = {
  title: string;
  tasks: Task[];
};

export type TasksAreaProps = {
  tasks: Task[];
};
