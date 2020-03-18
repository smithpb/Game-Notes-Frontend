import React from "react";
import { useCombinedReducer } from "../../reducer/combine-reducers";
import { axiosReq } from "../../util/axios/requests";
import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_INPUT
} from "../../reducer/dispatch-types";

function Login() {
  const [{ login }, dispatch] = useCombinedReducer();
  const { username, password, isLoading, error } = login;

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch({ type: LOGIN });

    try {
      const user = { username, password };
      const response = await axiosReq("post", "/auth/login", user);

      dispatch({ type: LOGIN_SUCCESS, payload: response.data });
      window.localStorage.setItem("jwt", response.data.token);
    } catch (err) {
      dispatch({ type: LOGIN_FAILURE, payload: err.response.data.message });
    }
  };

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
