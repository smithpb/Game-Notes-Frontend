import React, { useEffect, useMemo } from "react";
// import "./App.css";
import { GlobalStyle } from "./styles/body";
import { ThemeProvider } from "styled-components";
import Navbar from "./components/navbar/Navbar";
import theme from "./styles/themes";
import ROUTES, { RenderRoutes } from "./routes/routes";
import { AppContext } from "./contexts/context";
import { useCombinedReducer } from "./hooks/combine-reducers";
import { fetchCampaigns, axiosReq } from "./util/axios/requests";
import { LOGIN_SUCCESS, FAILURE } from "./reducer/dispatch-types";

function App() {
  const [state, dispatch] = useCombinedReducer();
  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    if (localStorage.getItem("jwt") && !state.user.isLoggedIn) {
      axiosReq("get", "/auth/verify")
        .then((response) => {
          dispatch({ type: LOGIN_SUCCESS, payload: response.data });
        })
        .catch((err) => {
          localStorage.clear();
          const errorMsg =
            err.response?.data.message || "No internet connection";
          dispatch({ type: FAILURE, payload: errorMsg });
        });
    }
    if (state.user.isLoggedIn) {
      console.log("Fetch all data FIRED!");
      fetchCampaigns(dispatch);
    }
  }, [dispatch, state.user.isLoggedIn]);

  return (
    <div className="App">
      <AppContext.Provider value={contextValue}>
        <ThemeProvider theme={theme[state.appState.theme]}>
          <GlobalStyle />
          <Navbar />
          <RenderRoutes routes={ROUTES} />
        </ThemeProvider>
      </AppContext.Provider>
    </div>
  );
}

export default App;
