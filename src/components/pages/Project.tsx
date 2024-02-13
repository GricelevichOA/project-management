import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ProjectType, Task, UserProfile } from "../../utils/types";
import { ChangeEvent, useEffect, useState } from "react";
import {
  clearCurrentProjectAction,
  clearProjectTasksAction,
  setCurrentProjectAction,
  setProjectCreatorAction,
  setProjectTasksAction,
} from "../../actions";
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { TaskCard } from "../common/TaskCard";
import { v4 as uuid4 } from "uuid";
import { TaskStatus } from "../../utils/enums";
import { createTask, getProjectTasks } from "../../api/firestore";
import { CreateTask } from "./CreateTask";
import { Label } from "@mui/icons-material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
  TimePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/ru";

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
    await setProjectTasksAction(dispatch, projectId || "");
    setIsCreatingTask(false);
    setAssignee("");
    setTitle("");
    setDescription("");
    setDueDate(Date.now());
  }

  useEffect(() => {
    const load = async () => {
      await setCurrentProjectAction(dispatch, projectId || "");
      await setProjectTasksAction(dispatch, projectId || "");
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
            <h2 className="project__title">
              {projects?.currentProject?.title}
            </h2>
            <div className="project__status">
              Current status: {projects?.currentProject?.status}
            </div>
            <time>
              Created at:{" "}
              {new Date(projects?.currentProject?.created_at).toString()}
            </time>
            <time>
              Updated at:{" "}
              {projects?.currentProject?.updated_at
                ? new Date(projects?.currentProject?.updated_at).toString()
                : "No updates at this time"}
            </time>
            <div className="project__description">
              Description: {projects?.currentProject?.description}
            </div>
          </div>
          <div className="project__tasks">
            <h2>Current tasks: </h2>
            <Button variant="outlined" onClick={handleOpenTaskForm}>
              Create task
            </Button>

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
                        onChange={handleDueDateChange}
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

            <Grid container spacing={2}>
              {projects.projectTasks.map((task: Task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </Grid>
          </div>
        </div>
      )}
    </>
  );
}
