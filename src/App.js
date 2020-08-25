import React, { useEffect } from "react";
// import "./App.css";
import { GlobalStyle } from "./styles/body";
import { ThemeProvider } from "styled-components";
import theme from "./styles/themes";
import ROUTES, { RenderRoutes } from "./routes/routes";
import { AppContext } from "./contexts/context";
import { useCombinedReducer } from "./hooks/combine-reducers";
import { fetchAllData, axiosReq } from "./util/axios/requests";
import { LOGIN_SUCCESS, FAILURE } from "./reducer/dispatch-types";

function App() {
  const [state, dispatch] = useCombinedReducer();

  useEffect(() => {
    if (localStorage.getItem("jwt") && !state.user.isLoggedIn) {
      axiosReq("get", "/auth/verify")
        .then((response) => {
          dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        })
        .catch((err) =>
          dispatch({ type: FAILURE, payload: err.response.data.message })
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
        <ThemeProvider theme={theme[state.appState.theme]}>
          <GlobalStyle />
          {/* <Navbar /> */}
          <RenderRoutes routes={ROUTES} />
        </ThemeProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
