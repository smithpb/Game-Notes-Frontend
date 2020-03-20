import React from "react";
import { Redirect } from "react-router-dom";
import { AppContext } from "../../contexts/context";
import { axiosReq } from "../../util/axios/requests";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_INPUT
} from "../../reducer/dispatch-types";

function Login({ history }) {
  const {
    state: { login },
    dispatch
  } = React.useContext(AppContext);
  const { username, password, isLoading, error } = login;

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch({ type: LOGIN });

    try {
      const user = { username, password };
      const response = await axiosReq("post", "/auth/login", user);

      localStorage.setItem("jwt", response.data.token);
      dispatch({ type: LOGIN_SUCCESS, payload: response.data });

      history.push("/app");
    } catch (err) {
      console.log(err.response);
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data.message });
    }
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
          onChange={e =>
            dispatch({
              type: LOGIN_INPUT,
              field: "username",
              payload: e.target.value
            })
          }
        ></input>
        <input
          type="password"
          name="password"
          placeholder="Enter password..."
          value={password}
          onChange={e =>
            dispatch({
              type: LOGIN_INPUT,
              field: "password",
              payload: e.target.value
            })
          }
        ></input>
        <button id="login-submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default Login;
