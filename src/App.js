import React, { useEffect } from "react";
import ROUTES, { RenderRoutes } from "./routes/routes";
import { AppContext } from "./contexts/context";
import { useCombinedReducer } from "./hooks/combine-reducers";
import Navbar from "./components/navbar/Navbar";
import { fetchAllData, axiosReq } from "./util/axios/requests";
import { LOGIN_SUCCESS, LOGIN_FAILURE } from "./reducer/dispatch-types";

function App() {
  const [state, dispatch] = useCombinedReducer();

  useEffect(() => {
    if (localStorage.getItem("jwt") && !state.user.isLoggedIn) {
      axiosReq("get", "/auth/verify")
        .then(response => {
          const payload = {
            token: localStorage.getItem("jwt"),
            user: response.data
          };
          dispatch({ type: LOGIN_SUCCESS, payload });
        })
        .catch(() =>
          dispatch({ type: LOGIN_FAILURE, payload: "Token has expired." })
        );
    }
  }, []);

  useEffect(() => {
    if (state.user.isLoggedIn) {
      console.log("Fetch all data FIRED!");
      fetchAllData(dispatch);
    }
  }, [state.user.isLoggedIn, dispatch]);

  return (
    <div className="App">
      <AppContext.Provider value={{ state, dispatch }}>
        <Navbar />
        <RenderRoutes routes={ROUTES} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
