import { TasksAreaProps } from "../../utils/types";
import { filterTasksByStatus } from "../../utils/misc";
import { Box } from "@mui/material";
import { TasksBlock } from "./TasksBlock";
import { TaskStatus } from "../../utils/enums";

export function TasksArea({ tasks }: TasksAreaProps) {
  return (
    <Box>
      {tasks !== null ? (
        <TasksBlock
          tasks={filterTasksByStatus(TaskStatus.overdue, tasks)}
          title="Overdue tasks"
        />
      ) : (
        ""
      )}

      {tasks !== null ? (
        <TasksBlock
          tasks={filterTasksByStatus(TaskStatus.created, tasks)}
          title="New tasks"
        />
      ) : (
        ""
      )}

      {tasks !== null ? (
        <TasksBlock
          tasks={filterTasksByStatus(TaskStatus.inProgress, tasks)}
          title="Tasks in progress"
        />
      ) : (
        ""
      )}

      {tasks !== null ? (
        <TasksBlock
          tasks={filterTasksByStatus(TaskStatus.finished, tasks)}
          title="Completed tasks"
        />
      ) : (
        ""
      )}

      {tasks !== null ? (
        <TasksBlock
          tasks={filterTasksByStatus(TaskStatus.cancelled, tasks)}
          title="Cancelled tasks"
        />
      ) : (
        ""
      )}
    </Box>
  );
}
