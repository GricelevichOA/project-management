import { Box, Typography } from "@mui/material";
import { ProjectForm } from "../common/ProjectForm";

export function CreateProject() {
  return (
    <Box>
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Create project page
      </Typography>
      <ProjectForm />
    </Box>
  );
}
