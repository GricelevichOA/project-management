import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Task, UserProfile } from "../../utils/types";
import { useEffect, useState } from "react";
import {
  clearCurrentProjectAction,
  setCurrentProjectAction,
} from "../../actions";
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
import { createTask } from "../../api/firestore";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import { TasksBlock } from "../common/TasksBlock";
import { filterTasksByStatus } from "../../utils/misc";

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
  const [assignee, setAssignee] = useState<string | number>("");
  const [dueDate, setDueDate] = useState<number>(Date.now());

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

  function handleDueDateChange(event: any) {
    setDueDate(Date.parse(event.$d));
  }

  async function handleCreateTask() {
    const newTask = {
      id: uuid4(),
      status: TaskStatus.created,
      title,
      description,
      assignee,
      due_date: dueDate,
      project_id: projects.currentProject.id,
      date_started: Date.now(),
    } as Task;
    await createTask(newTask);
    setIsCreatingTask(false);
    setAssignee("");
    setTitle("");
    setDescription("");
    setDueDate(Date.now());
  }

  useEffect(() => {
    const load = async () => {
      await setCurrentProjectAction(dispatch, projectId || "");
    };
    load();
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
                Created at:{" "}
              </Typography>
              {new Date(
                projects?.currentProject?.projectData?.created_at
              ).toString()}
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography component={"span"} sx={{ mr: 1 }}>
                Updated at:
              </Typography>
              {projects?.currentProject?.projectData?.updated_at
                ? new Date(
                    projects?.currentProject?.projectData?.updated_at
                  ).toString()
                : "No updates at this time"}
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
            <Box>
              {projects?.currentProject?.projectTasks !== null ? (
                <TasksBlock
                  tasks={filterTasksByStatus(
                    TaskStatus.overdue,
                    projects?.currentProject?.projectTasks
                  )}
                  title="Overdue tasks"
                />
              ) : (
                ""
              )}

              {projects?.currentProject?.projectTasks !== null ? (
                <TasksBlock
                  tasks={filterTasksByStatus(
                    TaskStatus.created,
                    projects?.currentProject?.projectTasks
                  )}
                  title="New tasks"
                />
              ) : (
                ""
              )}

              {projects?.currentProject?.projectTasks !== null ? (
                <TasksBlock
                  tasks={filterTasksByStatus(
                    TaskStatus.inProgress,
                    projects?.currentProject?.projectTasks
                  )}
                  title="Tasks in progress"
                />
              ) : (
                ""
              )}

              {projects?.currentProject?.projectTasks !== null ? (
                <TasksBlock
                  tasks={filterTasksByStatus(
                    TaskStatus.finished,
                    projects?.currentProject?.projectTasks
                  )}
                  title="Completed tasks"
                />
              ) : (
                ""
              )}

              {projects?.currentProject?.projectTasks !== null ? (
                <TasksBlock
                  tasks={filterTasksByStatus(
                    TaskStatus.cancelled,
                    projects?.currentProject?.projectTasks
                  )}
                  title="Cancelled tasks"
                />
              ) : (
                ""
              )}
            </Box>
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
                      sx={{ width: "100%" }}
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

                <Box sx={{ mb: 2 }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    adapterLocale="ru"
                  >
                    <DateTimePicker
                      value={dayjs(dueDate)}
                      sx={{ width: "100%" }}
                      label="Due date"
                      ampm={false}
                    />
                  </LocalizationProvider>
                </Box>

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
