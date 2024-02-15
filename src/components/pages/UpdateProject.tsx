import { useParams } from "react-router-dom";
import { ProjectForm } from "../common/ProjectForm";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getProject } from "../../api/firestore";
import { ProjectType } from "../../utils/types";

export function UpdateProject() {
  const params = useParams();
  const projectId = params.id;

  const [project, setProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    const load = async () => {
      const p = await getProject(projectId || "");
      setProject(p);
    };
    load();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Typography variant="h2" sx={{ textAlign: "center" }}>
        Update project
      </Typography>
      {project ? (
        <ProjectForm
          projectId={project?.id}
          projectTitle={project?.title}
          projectDescription={project?.description}
          createdAt={project?.created_at}
        />
      ) : (
        ""
      )}
    </>
  );
}
