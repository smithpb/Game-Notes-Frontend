import React from "react";
import { AppContext } from "../../contexts/context";
import { LOGOUT } from "../../reducer/dispatch-types";
import { Link } from "react-router-dom";

function Navbar({ history }) {
  const { state, dispatch } = React.useContext(AppContext);
  const { user } = state;

  const logout = () => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("jwt");
  };

  const logButton = () => {
    if (user.isLoggedIn) {
      return (
        <div className="logout-button" onClick={logout}>
          Logout
        </div>
      );
    }
    return (
      <Link to={"/login"} className="login-button">
        Login
      </Link>
    );
  };

  return (
    <div className="navbar-container">
      <p>{user.username}</p>
      {logButton()}
    </div>
  );
}

export default Navbar;
