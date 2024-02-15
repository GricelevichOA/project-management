import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Divider,
  Grid,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect } from "react";
import { ProjectCard } from "../common/ProjectCard";
import { setUserProjectsAction } from "../../actions";
import { TasksArea } from "../common/TasksArea";

export function Profile() {
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      await setUserProjectsAction(dispatch, users?.currentUser?.id);
    };
    load();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {users?.isLoading ? (
        <CircularProgress />
      ) : (
        <>
          <Box>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <Box>
                <img
                  src={users?.currentUser?.avatar_url}
                  alt={users?.currentUser?.username}
                />
              </Box>
              <Box sx={{}}>
                <Typography>{users?.currentUser?.username}</Typography>
                <Typography>
                  <a href={`mailto:${users?.currentUser?.email}`}>
                    {users?.currentUser?.email}
                  </a>
                </Typography>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h4" sx={{ mb: 2 }}>
                  My projects
                </Typography>
                {users.currentUserProjects?.projects?.length > 0 ? (
                  <Grid
                    container
                    spacing={2}
                    sx={{ justifyContent: "space-between" }}
                  >
                    {users.currentUserProjects?.projects?.map(
                      (project: any) => (
                        <ProjectCard key={project.id} project={project} />
                      )
                    )}
                  </Grid>
                ) : (
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                    Currently none
                  </Typography>
                )}
              </Box>

              <Divider />

              <Box>
                <Typography variant="h4">My assigned tasks</Typography>
                {users?.currentUserProjects?.tasks?.length > 0 ? (
                  <TasksArea tasks={users?.currentUserProjects?.tasks} />
                ) : (
                  <Typography variant="h4" sx={{ textAlign: "center" }}>
                    Currently none
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
