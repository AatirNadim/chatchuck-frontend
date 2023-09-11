import axios from "axios";
import {UserContextProvider} from "./Contexts/UserContext";
import Routes from "./Routes";

function App() {
  axios.defaults.baseURL = 'http://localhost:5001';
  axios.defaults.withCredentials = true;
  axios.defaults.headers['access-control-allow-credentials'] = true
  axios.defaults.headers['access-control-expose-headers'] = 'set-cookie' 
  
  return (
    <UserContextProvider>
      <Routes />
    </UserContextProvider>
  )
}

export default App
