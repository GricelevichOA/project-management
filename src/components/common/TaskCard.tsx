import { Card, CardContent, Typography } from "@mui/material";
import { TaskCardProps, UserProfile } from "../../utils/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// TODO: get rid of any
export function TaskCard({ task }: TaskCardProps) {
  const [assignee, setAssignee] = useState<any>(null);

  // TODO: избавиться от any
  const users = useSelector((state: any) => state.users);

  useEffect(() => {
    const a = users.allUsers.find(
      (user: UserProfile) => user.id === task.assignee
    );
    setAssignee(a);
  }, []);

  return (
    <Card variant="outlined" sx={{ minWidth: 275, minHeight: 200 }}>
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {task.description}
        </Typography>
      </CardContent>
      Username: {assignee?.username}
    </Card>
  );
}
