import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserProfile,
  getUserProfile,
  setUserProfile,
} from "../../api/firestore";
import { useNavigate } from "react-router-dom";
import { clearUserDataAction, setCurrentUserAction } from "../../actions";
import { auth } from "../../config/firebase";
import { deleteUser } from "firebase/auth";

export function UpdateProfile() {
  const users = useSelector((state: any) => state.users);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [avatarUrl, setAvatarUrl] = useState<string>(
    users.currentUser?.avatar_url
  );
  const [username, setUsername] = useState<string>(users.currentUser?.username);
  const [email, setEmail] = useState<string>(users.currentUser?.email);

  async function editProfileHandler() {
    await setUserProfile({
      id: users.currentUser.id,
      email,
      username,
      avatar_url: avatarUrl,
    });
    const user = await getUserProfile(users.currentUser?.id);
    setCurrentUserAction(dispatch, user);
    navigate("/profile");
  }

  async function deleteProfileHandler() {
    if (window.confirm("Вы точно хотите удалить аккаунт?")) {
      await deleteUserProfile(users.currentUser?.id);
      clearUserDataAction(dispatch);
      const user = auth.currentUser;
      if (user) {
        await deleteUser(user);
      }
      navigate("/register");
    }
  }

  return (
    <Box
      sx={{
        flex: "1 1",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          justifySelf: "center",
          alignSelf: "center",
          height: "100%",
        }}
      >
        <CardContent>
          <Typography sx={{ mb: 2 }} variant="h4">
            Edit profile
          </Typography>
          <Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                label="New username"
                variant="outlined"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                label="New email"
                variant="outlined"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                sx={{ width: "100%" }}
                label="New avatar (url string)"
                variant="outlined"
                value={avatarUrl}
                onChange={(e) => {
                  setAvatarUrl(e.target.value);
                }}
              />
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" onClick={editProfileHandler}>
                Save profile
              </Button>

              <Button
                color="error"
                variant="contained"
                onClick={deleteProfileHandler}
              >
                Delete profile
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
