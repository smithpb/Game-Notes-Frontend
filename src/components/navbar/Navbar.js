import React from "react";
import { AppContext } from "../../contexts/context";
import { LOGOUT } from "../../reducer/dispatch-types";
import { Link, withRouter } from "react-router-dom";
import { NavBar } from "./style";

function Navbar({ history }) {
  const { state, dispatch } = React.useContext(AppContext);
  const { user } = state;

  const logout = () => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("jwt");
    history.push("/login");
  };

  const LogButton = () => {
    if (user.isLoggedIn) {
      return (
        <div className="log-button" onClick={logout}>
          Logout
        </div>
      );
    }
    return (
      <Link to={"/login"} className="log-button">
        Login
      </Link>
    );
  };

  return (
    <NavBar>
      <p>{user.username}</p>
      <LogButton></LogButton>
    </NavBar>
  );
}

export default withRouter(Navbar);
