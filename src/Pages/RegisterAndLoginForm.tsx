import axios from "axios";
import React, { useState, useContext } from "react";
import { UserContext, UserContextType } from "../Contexts/UserContext";

enum LoginOrRegister {
  Login = "login",
  Register = "register",
}

const RegisterAndLoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername:setLoggedInUsername, setId } = useContext(UserContext) as UserContextType;
  const [isLoginOrRegister, setIsLoginOrRegister] = useState<LoginOrRegister>(
    LoginOrRegister.Login
  );
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(isLoginOrRegister);
      const { data } = await axios.post("dsd", { username, password });
      setLoggedInUsername(username);
      setId(data.id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="Enter username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="Enter password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already a member?
              <button
                className="ml-1"
                onClick={() => setIsLoginOrRegister(LoginOrRegister.Login)}
              >
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Dont have an account?
              <button
                className="ml-1"
                onClick={() => setIsLoginOrRegister(LoginOrRegister.Register)}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterAndLoginForm;
