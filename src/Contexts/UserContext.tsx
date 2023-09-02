import {createContext, useEffect, useState} from "react";
import axios from "axios";

export type UserContextType = {
  username: string | null,
  setUsername: (user: string) => void,
  id: string | null,
  setId: (idx: string) => void
}

export const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }) => {
  const [username, setUsername] = useState<string | null>(null);
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    axios.get('/profile').then(response => {
      setId(response.data.userId);
      setUsername(response.data.username);
    }).catch(err => {
      console.error(err);
    });
  }, []);
  return (
    <UserContext.Provider value={{username, setUsername, id, setId}}>
      {children}
    </UserContext.Provider>
  );
}
