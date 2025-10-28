import './App.css'
import {BrowserRouter} from "react-router";
import {ApplicationRoutes} from "./ApplicationRoutes.tsx";

function App() {

  return (
          <BrowserRouter>
              <ApplicationRoutes />
          </BrowserRouter>
  )
}

export default App;
