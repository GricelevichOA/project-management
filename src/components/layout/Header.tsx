import { Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../utils/auth";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Toolbar,
  Link,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

export function Header() {
  // TODO: избавиться от any
  const users = useSelector((store: any) => store.users);
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    setAnchorEl(e.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            component={RouterLink}
            to={"/"}
            color={"inherit"}
            underline="none"
          >
            Project management
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link
                component={RouterLink}
                to={"/projects"}
                color={"inherit"}
                underline="none"
              >
                Projects
              </Link>
            </Button>
            <Button sx={{ my: 2, color: "white", display: "block" }}>
              <Link
                component={RouterLink}
                to={"/projects/new"}
                color={"inherit"}
                underline="none"
              >
                New project
              </Link>
            </Button>
          </Box>

          {users?.currentUser ? (
            <>
              <Button color="inherit" id="user-button" onClick={handleClick}>
                <Avatar
                  alt={users.currentUser?.username}
                  src={users.currentUser?.avatar_url}
                />
                <Typography variant="button" display="block" gutterBottom>
                  {users.currentUser?.username}
                </Typography>
              </Button>
              <Menu
                id="user-menu"
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
              >
                <MenuItem>
                  <Link
                    component={RouterLink}
                    to={"/profile"}
                    color={"inherit"}
                    underline="none"
                    onClick={handleClose}
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    logOut(dispatch);
                  }}
                >
                  Log out
                </MenuItem>
              </Menu>

              <Box sx={{ flexGrow: 0 }}></Box>
            </>
          ) : (
            <>
              <Link
                component={RouterLink}
                to={"/register"}
                color={"inherit"}
                underline="none"
              >
                Sign Up
              </Link>
              <Link
                component={RouterLink}
                to={"/login"}
                color={"inherit"}
                underline="none"
              >
                Sign in
              </Link>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
