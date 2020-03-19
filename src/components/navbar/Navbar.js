import React from "react";
import { AppContext } from "../../contexts/context";
import { LOGOUT } from "../../reducer/dispatch-types";
import { Redirect } from "react-router-dom";

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
      <div className="login-button" onClick={() => <Redirect to={"/login"} />}>
        Login
      </div>
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
