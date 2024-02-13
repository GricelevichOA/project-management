import { Box, Grid, Typography } from "@mui/material";
import { Task, TaskBlockProps } from "../../utils/types";
import { TaskCard } from "./TaskCard";

export function TasksBlock({ tasks, title }: TaskBlockProps) {
  return tasks.length > 0 ? (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Grid container spacing={2}>
          {tasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </Grid>
      </Box>
    </>
  ) : (
    <></>
  );
}
