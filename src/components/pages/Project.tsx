import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { Task, UserProfile } from "../../utils/types";
import { useEffect, useState } from "react";
import { setCurrentProjectAction } from "../../actions";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuid4 } from "uuid";
import { TaskStatus } from "../../utils/enums";
import { setTask } from "../../api/firestore";
import "dayjs/locale/ru";
import { TasksArea } from "../common/TasksArea";
import { formatDate } from "../../utils/misc";

export function Project() {
  const params = useParams();
  const projectId = params.id;

  // TODO: get rid of any
  const projects = useSelector((state: any) => state.projects);
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const [isCreatingTask, setIsCreatingTask] = useState<boolean>(false);

  // NEW TASK FIELDS
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [assignee, setAssignee] = useState<string | number | undefined>(
    undefined
  );

  function handleOpenTaskForm() {
    setIsCreatingTask(true);
  }

  function handleCloseTaskForm() {
    setIsCreatingTask(false);
  }

  function handleAssigneeChange(event: any) {
    setAssignee(event.target.value);
  }

  function handleDescriptionChange(event: any) {
    setDescription(event.target.value);
  }

  function handleTitleChange(event: any) {
    setTitle(event.target.value);
  }

  async function handleCreateTask() {
    const newTask = {
      id: uuid4(),
      status: TaskStatus.created,
      title,
      description,
      assignee: assignee || users.currentUser.id,
      project_id: projects.currentProject?.projectData?.id,
      date_started: Date.now(),
    } as Task;

    await setTask(newTask);
    await setCurrentProjectAction(dispatch, projectId || "");
    setIsCreatingTask(false);
    setAssignee(undefined);
    setTitle("");
    setDescription("");
  }

  useEffect(() => {
    const load = async () => {
      await setCurrentProjectAction(dispatch, projectId || "");
    };
    load();

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {projects.isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h2">
              {projects?.currentProject?.projectData?.title}
            </Typography>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography sx={{ mr: 2 }}>Created by:</Typography>
              <Avatar
                sx={{ height: 24, width: 24, mr: 1 }}
                src={projects?.currentProject?.projectOwner?.avatar_url}
              />
              <Typography variant="body1">
                {projects?.currentProject?.projectOwner?.username}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography component={"span"} sx={{ mr: 1 }}>
                Created:{" "}
              </Typography>
              {formatDate(projects?.currentProject?.projectData?.created_at)}
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography component={"span"} sx={{ mr: 1 }}>
                Updated:
              </Typography>
              {projects?.currentProject?.projectData?.updated_at
                ? formatDate(projects?.currentProject?.projectData?.updated_at)
                : "No updates yet"}
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                Description:{" "}
                {projects?.currentProject?.projectData?.description}
              </Typography>
            </Box>
          </Box>

          <Divider orientation="horizontal" sx={{ mb: 4 }} />

          <Box sx={{}}>
            <Box sx={{ mb: 2 }}>
              <Button
                variant="outlined"
                onClick={handleOpenTaskForm}
                sx={{ mr: 2 }}
              >
                Create task
              </Button>

              <Link to={`/projects/${projectId}/edit`}>
                <Button variant="contained">Edit project</Button>
              </Link>
            </Box>
            <TasksArea tasks={projects?.currentProject?.projectTasks} />
          </Box>
          <Modal open={isCreatingTask} onClose={handleCloseTaskForm}>
            <Box
              sx={{
                top: "50%",
                left: "50%",
                position: "absolute" as "absolute",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
              }}
            >
              <Typography variant="h3">New Task</Typography>
              <Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    sx={{ width: "100%" }}
                    value={title}
                    variant="outlined"
                    label="Title"
                    onChange={handleTitleChange}
                  />
                </Box>
                <Box sx={{ mb: 2 }}>
                  <TextField
                    sx={{ width: "100%" }}
                    value={description}
                    variant="outlined"
                    label="Description"
                    multiline
                    onChange={handleDescriptionChange}
                  />
                </Box>
                <FormControl fullWidth>
                  <InputLabel>Assignee</InputLabel>
                  <Box sx={{ mb: 2 }}>
                    <Select
                      sx={{ width: "100%", display: "flex" }}
                      label="Assignee"
                      value={assignee}
                      onChange={handleAssigneeChange}
                    >
                      {users.allUsers.map((user: UserProfile) => {
                        return (
                          <MenuItem key={user?.id} value={user?.id}>
                            <Avatar src={user?.avatar_url} sx={{ mr: 2 }} />{" "}
                            {user?.username}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </Box>
                </FormControl>

                <Box>
                  <Button variant="contained" onClick={handleCreateTask}>
                    Submit
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </Box>
      )}
    </>
  );
}
