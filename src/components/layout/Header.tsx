import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../utils/auth";

export function Header() {
  // TODO: избавиться от any
  const users = useSelector((store: any) => store.users);
  const dispatch = useDispatch();

  return (
    <header className="Header">
      <nav className="navbar">
        <div className="navbar__links">
          <Link to={"/"} className="link">
            Project management app
          </Link>
        </div>
        {users.currentUser ? (
          <div className="navbar__auth">
            <div>{users.currentUser.email}</div>
            <button
              onClick={() => {
                logOut(dispatch);
              }}
            >
              Sign out
            </button>
          </div>
        ) : (
          <div className="navbar__auth">
            <Link to={"/login"} className="link">
              Sign in
            </Link>
            <Link to={"/register"} className="link">
              Sign up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
