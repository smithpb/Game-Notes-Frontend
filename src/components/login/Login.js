import React from "react";
import { initialState, loginReducer } from "../../reducer/login-reducer";
import { axiosReq } from "../../util/axios/requests";

function Login() {
  const [state, dispatch] = React.useReducer(loginReducer, initialState);
  const { username, password, isLoading, error } = state;

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch({ type: "login" });
    try {
      const response = await axiosReq("post", "/auth/login", {
        username,
        password
      });
      dispatch({ type: "success" });
      window.localStorage.setItem("jwt", response.data.token);
    } catch (err) {
      dispatch({ type: "failure", payload: err.response.data.message });
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
              type: "change",
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
              type: "change",
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
