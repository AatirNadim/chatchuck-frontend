import {createContext, useEffect, useState} from "react";
import axios from "axios";

export type UserContextType = {
  username: string | null,
  setUsername: (user: string | null) => void,
  id: string | null,
  setId: (idx: string | null) => void,
  dispLoader : boolean,
  setDispLoader : (disp : boolean) => void
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [dispLoader, setDispLoader] = useState<boolean>(false);
  useEffect(() => {
    axios.get('/profile', { withCredentials: true }).then(response => {
      setId(response.data.userId);
      setUsername(response.data.username);
    }).catch(err => {
      console.error(err);
    });
  }, []);
  return (
    <UserContext.Provider value={{username, setUsername, id, setId, setDispLoader, dispLoader}}>
      {children}
    </UserContext.Provider>
  );
}
