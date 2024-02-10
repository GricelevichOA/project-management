import { ProjectForm } from "../common/ProjectForm";

export function CreateProject() {
  return (
    <div className="new-project">
      <h2 className="new-project__title">Create project page</h2>
      <div className="new-project__form">
        <ProjectForm />
      </div>
    </div>
  );
}
