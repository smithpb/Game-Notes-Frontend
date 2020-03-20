import React, { useEffect } from "react";
import ROUTES, { RenderRoutes } from "./routes/routes";
import { AppContext } from "./contexts/context";
import { useCombinedReducer } from "./hooks/combine-reducers";
import Navbar from "./components/navbar/Navbar";
import { fetchAllData } from "./util/axios/requests";

function App() {
  const [state, dispatch] = useCombinedReducer();

  useEffect(() => {
    if (state.user.isLoggedIn) {
      fetchAllData(dispatch);
    }
  }, [state.user.isLoggedIn]);

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
