import React from "react";
import ROUTES, { RenderRoutes } from "./routes/routes";
import { AppContext } from "./contexts/context";
import { useCombinedReducer } from "./hooks/combine-reducers";
import Navbar from "./components/navbar/Navbar";

function App() {
  const [state, dispatch] = useCombinedReducer();

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
