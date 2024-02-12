import { useSelector } from "react-redux";
import {
  UserProfile,
  ProjectType,
  UsersState,
} from "../../utils/types";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ProjectCard } from "../common/ProjectCard";

export function Profile() {
  const [userProjects, setUserProjects] = useState<any>(null);

  // TODO: get rid of any
  const user = useSelector((state: any) => state.users);
  const currentUser: UserProfile = user.currentUser;
  const projects = useSelector((state: any) => state.projects);

  useEffect(() => {
    const filteredUserProjects = projects.items.filter(
      (project: ProjectType) => project?.user_id === currentUser?.id
    );
    setUserProjects(filteredUserProjects);
  }, []);

  return (
    <Box>
      <Box sx={{ border: "1px solid black" }}>
        <img src={currentUser?.avatar_url} alt={currentUser?.username} />
      </Box>
      <Box sx={{ border: "1px solid black" }}>
        <Typography>{currentUser?.username}</Typography>
        <Typography>{currentUser?.email}</Typography>
      </Box>
      <Box sx={{ border: "1px solid black" }}>
        <Grid container spacing={2} sx={{ border: "1px solid black" }}>
          {userProjects?.map((project: any) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
