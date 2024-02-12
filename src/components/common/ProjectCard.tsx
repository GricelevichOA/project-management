import { Grid } from "@mui/material";
import { ProjectCardProps } from "../../utils/types";

export function ProjectCard({ project }: ProjectCardProps) {
  return <Grid item>{project?.title}</Grid>;
}
