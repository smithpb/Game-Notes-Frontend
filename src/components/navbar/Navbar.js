import React from "react";
import { AppContext } from "../../contexts/context";
import { LOGOUT } from "../../reducer/dispatch-types";
// import { withRouter } from "react-router-dom";

function Navbar() {
  const { state, dispatch } = React.useContext(AppContext);
  const { user } = state;

  const logout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div className="navbar-container">
      <p>{user.username}</p>
      <div className="logout-button" onClick={logout}>
        Logout
      </div>
    </div>
  );
}

export default Navbar;
