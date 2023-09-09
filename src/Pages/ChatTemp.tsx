import React, { useState, useRef, useContext } from "react";
import Logo from "../assets/SVGs/Logo";
import { BiSolidSend } from "react-icons/bi";
import { PiLinkSimpleBold } from "react-icons/pi";
import Profile from "../assets/SVGs/Profile";
import { UserContext, UserContextType } from "../Contexts/UserContext";
import { IoMdLogOut } from 'react-icons/io'

const ChatTemp = () => {
  const [ws, setWs] = useState(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState([]);
  const { username, id, setId, setUsername } = useContext(
    UserContext
  ) as UserContextType;
  const divUnderMessages = useRef();
  return (
    <div className="h-screen w-screen flex flex-row bg-one !text-lg">
      <div className=" w-1/4 flex flex-col bg-two m-2 rounded-xl ">
        <div className="w-full flex flex-row justify-center gap-4 items-center p-4">
          <Logo size="32px" />
          <div className="font-semibold text-2xl text-four">ChatChuck</div>
        </div>
        <div className="flex-grow overflow-auto">Profiles</div>
        <div className="mt-auto w-full p-4 flex flex-row items-center justify-center gap-4">
          {/* <div className="">/ */}
          <div className="flex items-center justify-center gap-2">
            <Profile />
            <div className="">Username</div>
          </div>
          <button className="bg-four px-4 py-2 rounded-xl font-semibold text-one flex items-center justify-center">
            <IoMdLogOut size= {'28px'} />
          </button>
        </div>
        {/* </div> */}
      </div>
      <div className="w-3/4 flex flex-col h-full">
        {!!selectedUserId ? (
          <>
            <div className="h-12 flex flex-row justify-end"></div>
            <div className="">Chat per user</div>
            <div className="mt-auto h-16 flex flex-row justify-around items-center p-4 gap-4">
              <input
                className="flex-1 h-12 outline-none border-2 border-four rounded-xl px-4 bg-one "
                type="text"
                placeholder="Type a message..."
              />
              <label className="p-4 rounded-full bg-four flex items-center justify-center cursor-pointer">
                <input type="file" className="hidden" />
                <PiLinkSimpleBold size={"20px"} className="text-white" />
              </label>
              <button className="p-4 rounded-full bg-four">
                <BiSolidSend size={"20px"} className="text-white" />
              </button>
            </div>{" "}
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-three flex-col">
            <div className="font-semibold text-3xl" >No chat selected</div>
            <div >Select a profile to begin/continue chatting</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTemp;
