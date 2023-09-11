import axios from "axios";
import React, { useState, useContext } from "react";
import { UserContext, UserContextType } from "../Contexts/UserContext";
import Logo from "../assets/SVGs/Logo";

enum LoginOrRegister {
  Login = "login",
  Register = "register",
}

const Temp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setUsername: setLoggedInUsername, setId } = useContext(
    UserContext
  ) as UserContextType;
  const [isLoginOrRegister, setIsLoginOrRegister] = useState<LoginOrRegister>(
    LoginOrRegister.Login
  );
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      console.log(isLoginOrRegister);
      const { data } = await axios.post(isLoginOrRegister, { username, password });
      // const res = await axios.get('/test');
      // await axios.get('/test');
      console.log(data)
      setLoggedInUsername(username);
      setId(data.id);
      // console.log(resp.headers);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen w-screen flex flex-row items-center justify-center bg-one overflow-y-auto !cursor-default">
      <div className="sm:w-full sm:h-[600px] overflow-hidden lg:w-[900px] lg:h-[600px] rounded-xl bg-four flex flex-row p-6 justify-around items-start">
        <div className="bg-transparent w-1/2 flex flex-col justify-start pt-12 items-start px-4 gap-4 ">
          <div className="flex flex-row gap-4 items-start">
            <div className="bg-one rounded-xl p-4">
              <Logo />
            </div>
            <div className="font-bold text-5xl text-one">ChatChuck</div>
          </div>
          <div className="font-semibold text-2xl text-[#eadbc8] items-start flex flex-col gap-4 w-full">
            <div>Connecting thoughts</div>
            <div>One tap at a time</div>
          </div>
        </div>
        <div className="w-1/2 px-6 py-12 h-full rounded-xl flex flex-col justify-start items-center gap-12 bg-one">
          <div className="text-four font-bold text-4xl">{`Welcome ${isLoginOrRegister === LoginOrRegister.Login ? 'Back' : 'Front'}!`}</div>
          <input
            className="w-full h-12 outline-none border-2 border-four rounded-xl bg-one py-2 px-4 text-four font-semibold text-lg"
            placeholder="Email"
            type="email"
            onChange={(ev) => setUsername(ev.target.value)}
          />
          <input
            className="w-full h-12 outline-none border-2 border-four rounded-xl bg-one py-2 px-4 text-four font-semibold text-lg"
            placeholder="Password"
            type="password"
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className="w-full p-4 h-12 text-xl font-semibold bg-four text-one flex justify-center items-center rounded-xl"
            onClick={handleSubmit}
          >
            <div>
              {isLoginOrRegister === LoginOrRegister.Login
                ? "Sign In"
                : "Register"}
            </div>
          </button>
          <div
            className="mb-auto cursor-pointer "
            onClick={(e) => {
              if (isLoginOrRegister === LoginOrRegister.Login)
                setIsLoginOrRegister(LoginOrRegister.Register);
              else setIsLoginOrRegister(LoginOrRegister.Login);
            }}
          >
            {isLoginOrRegister === LoginOrRegister.Login
              ? `Don't have an account? Register`
              : `Already have an account? Login`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Temp;
