// TODO: избавиться от any
export type ProjectType = {
  id: string;
  title: string;
  description: string;
  user_id: string;
  status: string;
  created_at: any;
  updated_at: any;
};

export type ProjectsState = {
  items: Array<ProjectType>;
  currentProject: ProjectType | null;
  isLoading: boolean;
  error: string | null;
};

export type NewProject = {
  title: string;
  description: string;
  user_id: string;
  status: string;
  created_at: any;
  updated_at: any;
};

export type Props = {
  children: string | JSX.Element | JSX.Element[];
};
