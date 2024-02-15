import "../styles/App.scss";
import {
  useDispatch,
  // useSelector
} from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Content } from "./layout/Content";
import { Index } from "./pages/Index";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import {
  setCurrentUserAction,
  setProjectsAction,
  setTasksAction,
  setUserProfilesAction,
} from "../actions";
import { getUserProfile } from "../api/firestore";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project";
import { Profile } from "./pages/Profile";
import { CreateProject } from "./pages/CreateProject";
import { UpdateProject } from "./pages/UpdateProject";
import { UpdateProfile } from "./pages/UpdateProfile";
import { Auth } from "./pages/Auth";

function App() {
  // const users = useSelector((store: any) => store.users);
  // const projects = useSelector((store: any) => store.projects);
  // const tasks = useSelector((store: any) => store.tasks);

  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        getUserProfile(user.uid).then((data) => {
          setCurrentUserAction(dispatch, data);
        });
      }
    });
    const load = async () => {
      await setUserProfilesAction(dispatch);
      await setProjectsAction(dispatch);
      await setTasksAction(dispatch);
    };
    load();
    // eslint-disable-next-line
  }, []);

  function checkAuth(element: JSX.Element) {
    if (currentUser) {
      return element;
    }

    return <Navigate to="/login" />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route
              path="/auth"
              element={!currentUser ? <Auth /> : <Navigate to="/" />}
            />
            <Route
              path="/register"
              element={!currentUser ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!currentUser ? <Login /> : <Navigate to="/" />}
            />
            <Route path="/projects/:id" element={checkAuth(<Project />)} />
            <Route
              path="/projects/new"
              element={checkAuth(<CreateProject />)}
            />
            <Route
              path="/projects/:id/edit"
              element={checkAuth(<UpdateProject />)}
            />

            <Route path="/profile" element={checkAuth(<Profile />)} />
            <Route
              path="/profile/edit"
              element={checkAuth(<UpdateProfile />)}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
