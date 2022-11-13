import { useSelector } from "react-redux";
import Home from "./Home";
import Login from "./Login";
import { selectAuthState } from "./store/features/auth/authSlice";

function App() {
  const authState = useSelector(selectAuthState);

  return <div>{!authState.auth ? <Login /> : <Home />}</div>;
}
export default App;
