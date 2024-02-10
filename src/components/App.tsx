import "../styles/App.scss";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Header } from "./layout/Header";
import { Footer } from "./layout/Footer";
import { Content } from "./layout/Content";
import { Index } from "./pages/Index";
import { NotFound } from "./pages/NotFound";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { setCurrentUserAction } from "../actions";
import { getUserProfile } from "../api/firestore";
import { Projects } from "./pages/Projects";
import { Project } from "./pages/Project";
import { Profile } from "./pages/Profile";
import { CreateProject } from "./pages/CreateProject";
import { UpdateProject } from "./pages/UpdateProject";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getUserProfile(user.uid).then((data) => {
          setCurrentUserAction(dispatch, data);
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<Project />} />
            <Route path="/projects/new" element={<CreateProject />} />
            <Route path="/projects/:id/edit" element={<UpdateProject />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Content>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
