import { useNavigate, useParams } from "react-router-dom";
import { ProjectForm } from "../common/ProjectForm";
import { deleteProject } from "../../api/firestore";

export function UpdateProject() {
  const params = useParams();
  const projectId = params.id;

  const navigate = useNavigate();

  function deleteProjectHandler() {
    if (projectId) {
      deleteProject(projectId);
      navigate("/projects")
    }
  }

  return (
    <>
      <h2>Update project</h2>
      <ProjectForm projectId={projectId} />
      <button onClick={deleteProjectHandler}>Delete project</button>
    </>
  );
}
