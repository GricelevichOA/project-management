import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { LoginForm } from "../common/LoginForm";
import { RegisterForm } from "../common/RegisterForm";

export function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  return (
    <Box>
      <Typography variant="h2">Auth page</Typography>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </Box>
  );
}
