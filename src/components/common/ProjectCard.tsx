import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ProjectCardProps } from "../../utils/types";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "../../utils/misc";

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Grid item>
      <Card variant="outlined" sx={{ width: 350, minHeight: 300 }}>
        <CardContent>
          <Typography variant="h6">
            <Link
              component={RouterLink}
              underline="hover"
              to={`/projects/${project?.id}`}
            >
              {project?.title}
            </Link>
          </Typography>
          <Divider />
          <Box sx={{ wordWrap: "break-word", minHeight: 200 }}>
            <Typography variant="body1">{project?.description}</Typography>
          </Box>
          <Divider />
          <Box>
            <Typography variant="caption">
              Created: {formatDate(project?.created_at)}
            </Typography>
            {project?.updated_at ? (
              <Typography variant="caption">
                Updated: {formatDate(project?.updated_at)}
              </Typography>
            ) : (
              ""
            )}
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
}
