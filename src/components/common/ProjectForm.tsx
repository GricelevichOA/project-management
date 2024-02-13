import { useState, ReactElement } from "react";
import { useSelector } from "react-redux";
import { createProject } from "../../api/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@mui/material";

type FormProps = {
  title?: string;
  description?: string;
  projectId?: string;
};

export function ProjectForm({
  title = "",
  description = "",
  projectId = "",
}): ReactElement<FormProps> {
  const [formTitle, setTitle] = useState("");
  const [formDescription, setDescription] = useState("");

  const params = useParams();

  const users = useSelector((state: any) => state.users);
  const navigate = useNavigate();

  async function createProjectHandler() {
    const newProject = {
      id: projectId || uuidv4(),
      title: formTitle,
      description: formDescription,
      user_id: users.currentUser.id,
      status: "new",
      created_at: Date.now(),
      updated_at: "",
    };

    await createProject(newProject);
    navigate(`/projects/${newProject.id}`);
  }

  return (
    <div className="project-form">
      <div className="project-form__input">
        <input
          type="text"
          placeholder="Project title"
          value={formTitle}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="project-form__input">
        <label htmlFor="description">Project description: </label>
        <br />
        <textarea
          value={formDescription}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <br />
      <Button onClick={createProjectHandler} variant="contained">
        Submit
      </Button>
    </div>
  );
}
