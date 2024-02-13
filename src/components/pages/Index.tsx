import { Box, Typography } from "@mui/material";

export function Index() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        flex: "1 1"
      }}
    >
      <Typography variant="h1">Welcome to project management app</Typography>
      <Typography variant="h2">Made by me for you</Typography>
    </Box>
  );
}
