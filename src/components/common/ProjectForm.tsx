import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../../api/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Box, Button, Card, CardContent, TextField } from "@mui/material";
import { deleteProject } from "../../api/firestore";
import { setUserProjectsAction } from "../../actions";

type FormProps = {
  projectId?: string;
  projectTitle?: string;
  projectDescription?: string;
  createdAt?: number;
};

export function ProjectForm({
  projectId,
  projectTitle,
  projectDescription,
  createdAt,
}: FormProps) {
  const [formTitle, setTitle] = useState(projectTitle);
  const [formDescription, setDescription] = useState(projectDescription);

  const users = useSelector((state: any) => state.users);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();

  async function deleteProjectHandler() {
    if (projectId) {
      deleteProject(projectId);
      await setUserProjectsAction(dispatch, users?.currentUser?.id);
      navigate("/profile");
    }
  }

  async function createProjectHandler() {
    const newProject = {
      id: projectId || uuidv4(),
      title: formTitle,
      description: formDescription,
      user_id: users.currentUser.id,
      status: "new",
      created_at: projectId ? createdAt : Date.now(),
      updated_at: projectId ? Date.now() : "",
    };

    await createProject(newProject);
    navigate(`/projects/${newProject.id}`);
  }

  return (
    <Box
      sx={{
        display: "flex",
        flex: "1 1",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          minHeight: 400,
          minWidth: 300,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: "1 1",
          }}
        >
          <Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                label="Project title"
                value={formTitle}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                multiline
                label="Project description"
                sx={{ width: "100%" }}
                minRows={7}
                value={formDescription}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={createProjectHandler} variant="contained">
              Submit
            </Button>
            {params.id ? (
              <Button
                variant="contained"
                color="error"
                onClick={deleteProjectHandler}
              >
                Delete
              </Button>
            ) : (
              ""
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
