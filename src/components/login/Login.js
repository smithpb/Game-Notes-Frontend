import React from "react";
import { Redirect } from "react-router-dom";
import { AppContext } from "../../contexts/context";
import { axiosReq } from "../../util/axios/requests";
import { LOADING, LOGIN_SUCCESS, FAILURE } from "../../reducer/dispatch-types";

function Login({ history }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const {
    state: { appState },
    dispatch
  } = React.useContext(AppContext);
  const { isLoading, error } = appState;

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch({ type: LOADING });

    try {
      const user = { username, password };
      const response = await axiosReq("post", "/auth/login", user);

      localStorage.setItem("jwt", response.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });

      history.push("/app");
    } catch (err) {
      console.log(err.response);
      dispatch({ type: FAILURE, payload: err.response.data.message });
    }
    setPassword("");
    setUsername("");
  };

  if (window.localStorage.getItem("jwt")) {
    return <Redirect to={"/app"} />;
  }

  return (
    <div className="login-component">
      {error && <div className="error-message">{error}</div>}
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter username..."
          value={username}
          onChange={e => setUsername(e.target.value)}
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={password}
          onChange={e => setPassword(e.target.value)}
        ></input>
        <button id="login-submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Login;
