import RegisterAndLoginForm from "./Pages/RegisterAndLoginForm.js";
import { useContext } from "react";
import { UserContext, UserContextType } from "./Contexts/UserContext.js";
import Chat from "./Pages/Chat.js";
import Temp from "./Pages/Temp.js";
import ChatTemp from "./Pages/ChatTemp.js";
import Loader from "./components/Loader.js";

export default function Routes() {
  const { username, id } = useContext(UserContext) as UserContextType;

  if (username) {
    return (
      <>
        <Loader />
        <ChatTemp />
      </>
    );
  }

  return (
    // <RegisterAndLoginForm />
    <Temp />
  );
}
