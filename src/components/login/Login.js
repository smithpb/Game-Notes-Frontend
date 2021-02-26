import React from "react";
import { AppContext } from "../../contexts/context";
import { axiosReq } from "../../util/axios/requests";
import { Link } from "react-router-dom";
import {
  LOADING,
  LOGIN_SUCCESS,
  FAILURE,
  // CHANGE_THEME,
} from "../../reducer/dispatch-types";
import { LoginContainer } from "./styled";
import { MainButton } from "../../styles";

function Login({ history }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {
    state: { appState },
    dispatch,
  } = React.useContext(AppContext);
  const { isLoading, error } = appState;

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch({ type: LOADING });

    try {
      const user = { username, password };
      const response = await axiosReq("post", "/auth/login", user);

      localStorage.setItem("jwt", response.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });

      clearInputs();
      history.push("/app");
    } catch (err) {
      console.log(err);
      setPassword("");
      dispatch({ type: FAILURE, payload: err.response?.data.message });
    }
  };

  const clearInputs = () => {
    setPassword("");
    setUsername("");
  };

  return (
    <LoginContainer>
      <h1>Campaign Tracker</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <header className="header">
          <h2>Login</h2>
        </header>
        {!!error && <div className="error-message">{error}</div>}
        <div className="inputs">
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              // placeholder="Enter username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
          </label>
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              // placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </label>
        </div>
        <MainButton id="login-submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </MainButton>
      </form>
      <div className="register-container">
        <h3>New user?</h3>
        <Link to={"/register"}>
          <MainButton id="register">Register</MainButton>
        </Link>
      </div>
    </LoginContainer>
  );
}

export default Login;
