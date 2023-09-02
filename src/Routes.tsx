import RegisterAndLoginForm from "./Pages/RegisterAndLoginForm.js";
import {useContext} from "react";
import {UserContext, UserContextType} from "./Contexts/UserContext.js";
import Chat from "./Pages/Chat.js";

export default function Routes() {
  const {username, id} = useContext(UserContext) as UserContextType;

  if (username) {
    return <Chat />;
  }

  return (  
    <RegisterAndLoginForm />
  );
}