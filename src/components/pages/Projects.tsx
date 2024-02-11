import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProjectsAction } from "../../actions";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

export function Projects() {
  // TODO GET RID OF ANY
  const projects = useSelector((store: any) => store.projects);
  const dispatch = useDispatch();
  useEffect(() => {
    const load = async () => {
      await setProjectsAction(dispatch);
    };
    load();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <h2>Projects page</h2>
      {projects.isLoading ? (
        <CircularProgress />
      ) : (
        <>
          {" "}
          <ul>
            {projects.items.map((pr: any) => (
              <li key={pr.id}>
                <Link to={`/projects/${pr.id}`}>{pr.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
