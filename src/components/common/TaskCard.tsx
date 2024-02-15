import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { TaskCardProps, UserProfile } from "../../utils/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStatusColor } from "../../utils/misc";
import { TaskStatus } from "../../utils/enums";
import { setTask } from "../../api/firestore";
import { useLocation } from "react-router-dom";
import { setCurrentProjectAction, setUserProjectsAction } from "../../actions";

export function TaskCard({ task }: TaskCardProps) {
  const [assignee, setAssignee] = useState<UserProfile | null>(null);

  const users = useSelector((state: any) => state.users);
  const projects = useSelector((state: any) => state.projects);

  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const a = users.allUsers.find(
      (user: UserProfile) => user.id === task.assignee
    );
    setAssignee(a);

    // eslint-disable-next-line
  }, []);

  async function handleTaskStart() {
    await setTask({
      ...task,
      status: TaskStatus.inProgress,
    });
    if (location.pathname === "/profile") {
      await setUserProjectsAction(dispatch, users?.currentUser?.id);
    } else if (location.pathname.includes("/project")) {
      await setCurrentProjectAction(
        dispatch,
        projects.currentProject?.projectData?.id
      );
    }
  }

  async function handleTaskFinish() {
    await setTask({
      ...task,
      status: TaskStatus.finished,
    });
    if (location.pathname === "/profile") {
      await setUserProjectsAction(dispatch, users?.currentUser?.id);
    } else if (location.pathname.includes("/project")) {
      await setCurrentProjectAction(
        dispatch,
        projects.currentProject?.projectData?.id
      );
    }
  }

  function setTaskButton(status: string) {
    if (status === TaskStatus.created) {
      return (
        <Button variant="contained" onClick={handleTaskStart}>
          Start task
        </Button>
      );
    } else if (status === TaskStatus.inProgress) {
      return (
        <Button variant="contained" onClick={handleTaskFinish}>
          Complete task
        </Button>
      );
    }
  }

  return (
    <Grid item xs={4}>
      <Card variant="outlined" sx={{ minWidth: 275, minHeight: 350 }}>
        <CardContent>
          <Chip
            label={task.status}
            sx={{ backgroundColor: setStatusColor(task.status) }}
          />
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            sx={{ borderBottom: "1px solid #000" }}
          >
            {task.title}
          </Typography>

          <Box sx={{ minHeight: 200 }}>
            <Typography sx={{ wordWrap: "break-word", mb: 2 }} variant="body1">
              {task.description}
            </Typography>
          </Box>

          <Divider />

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              mt: 1,
            }}
          >
            <Typography variant="caption" sx={{ mr: 1, display: "flex" }}>
              Assigned to:
            </Typography>
            <Avatar
              src={assignee?.avatar_url}
              sx={{ height: 24, width: 24, mr: 1 }}
            />
            <Typography variant="caption" sx={{ mr: 1, display: "flex" }}>
              {assignee?.username}
            </Typography>

            <Typography variant="body1" color=""></Typography>
          </Box>
        </CardContent>
        <CardActions>
          {setTaskButton(task.status)}
          {/* <Button onClick={handleTaskStart} variant="contained">
            Start task
          </Button>
          <Button onClick={handleTaskFinish} variant="contained">
            Complete task
          </Button> */}
        </CardActions>
      </Card>
    </Grid>
  );
}
