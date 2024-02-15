import { Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <Box component="footer" className="Footer">
      <Typography>2024 (c) No Rights Reversed</Typography>
      <Typography>
        <Link
          to="https://github.com/GricelevichOA/project-management"
          target="_blank"
        >
          Github
        </Link>
      </Typography>
    </Box>
  );
}
