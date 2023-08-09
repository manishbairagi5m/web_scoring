import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense,lazy } from "react";

const MatchLive = lazy(() => import("./StartMatch/scoring/MatchLive"));
const MatchesList = lazy(() => import("./StartMatch/MatchesList"));

function App() {
  return (
    <div className="App" style={{ padding: "10px 300px" }}>
      <Router>
        <Suspense fallback={"loading..."}>
          <Routes>
            <Route 
             path={"/matches"}
             name={"Matches"}
             element={<MatchesList />}
            />
            <Route 
             path={"/live"}
             name={"Live"}
             element={<MatchLive />}
            />
            <Route 
             path={"/*"}
             name={"Other"}
             element={<Navigate replace to="/matches" />}
            />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
