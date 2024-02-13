import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Typography,
} from "@mui/material";
import { TaskCardProps, UserProfile } from "../../utils/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setStatusColor } from "../../utils/misc";

// TODO: get rid of any
export function TaskCard({ task }: TaskCardProps) {
  const [assignee, setAssignee] = useState<UserProfile | null>(null);

  // TODO: избавиться от any
  const users = useSelector((state: any) => state.users);

  useEffect(() => {
    const a = users.allUsers.find(
      (user: UserProfile) => user.id === task.assignee
    );
    setAssignee(a);
  }, []);

  return (
    <Grid item xs={4}>
      <Card variant="outlined" sx={{ minWidth: 275, minHeight: 300 }}>
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

          <Typography variant="body1">{task.description}</Typography>

          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography variant="body1" sx={{ mr: 1 }}>
              Assigned to:
            </Typography>
            <Avatar src={assignee?.avatar_url} sx={{ height: 24, width: 24 }} />
            <Typography variant="body1" color="">
              {assignee?.username}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
