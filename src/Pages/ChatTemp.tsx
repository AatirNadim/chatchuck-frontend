import React, { useState, useRef, useContext, useEffect } from "react";
import Logo from "../assets/SVGs/Logo";
import { BiSolidSend } from "react-icons/bi";
import { PiLinkSimpleBold } from "react-icons/pi";
import Profile from "../assets/SVGs/Profile";
import { UserContext, UserContextType } from "../Contexts/UserContext";
import { IoMdLogOut } from "react-icons/io";
import axios from "axios";
import { uniqBy } from "lodash";
import { FileType, MessageType } from "../assets/types";
import Contact from "../components/Contaxt";

const ChatTemp = () => {
  const [ws, setWs] = useState<null | WebSocket>(null);
  const [onlinePeople, setOnlinePeople] = useState({});
  const [offlinePeople, setOfflinePeople] = useState({});
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([] as MessageType[]);
  const { username, id, setId, setUsername } = useContext(
    UserContext
  ) as UserContextType;
  const divUnderMessages = useRef<HTMLDivElement | null>();

  const handleLogout = () => {
    axios.post("/logout").then(() => {
      setWs(null);
      setId(null);
      setUsername(null);
    });
  };

  useEffect(() => {
    connectToWs();
  }, [selectedUserId]);

  const handleFunc = (e) => {
    console.log("message from the socket", e);
  };

  function connectToWs() {
    const ws = new WebSocket("ws://localhost:5001");
    setWs(ws);
    ws.addEventListener("message", handleMessage);
    ws.addEventListener("close", () => {
      setTimeout(() => {
        console.log("Disconnected. Trying to reconnect.");
        connectToWs();
      }, 1000);
    });
  }

  function showOnlinePeople(peopleArray) {
    const people = {};
    peopleArray.forEach(({ userId, username }) => {
      people[userId] = username;
    });
    // console.log("online people --> \n\n", people);
    setOnlinePeople(people);
  }

  function handleMessage(ev) {
    const messageData = JSON.parse(ev.data);
    // console.log({ ev, messageData });
    if ("online" in messageData) {
      showOnlinePeople(messageData.online);
    } else if ("text" in messageData) {
      if (messageData.sender === selectedUserId) {
        setMessages((prev) => [...prev, { ...messageData }]);
      }
    }
  }

  function sendMessage(ev, file = null) {
    if (ev) ev.preventDefault();
    ws?.send(
      JSON.stringify({
        recipient: selectedUserId,
        text: newMessageText,
        file,
      })
    );
    if (file) {
      axios.get("/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    } else {
      setNewMessageText("");
      setMessages((prev) => [
        ...prev,
        {
          text: newMessageText,
          sender: id,
          recipient: selectedUserId,
          _id: Date.now(),
        },
      ]);
    }
  }

  function sendFile(ev) {
    const reader = new FileReader();
    reader.readAsDataURL(ev.target.files[0]);
    reader.onload = () => {
      sendMessage(null, {
        name: ev.target.files[0].name,
        data: reader.result,
      });
    };
  }

  useEffect(() => {
    const div = divUnderMessages.current;
    if (div) {
      div.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    axios.get("/people").then((res) => {
      const offlinePeopleArr = res.data
        .filter((p) => p._id !== id)
        .filter((p) => !Object.keys(onlinePeople).includes(p._id));
      const offlinePeople = {};
      offlinePeopleArr.forEach((p) => {
        offlinePeople[p._id] = p;
      });
      // console.log("offline people --> \n\n", offlinePeople);
      setOfflinePeople(offlinePeople);
    });
  }, [onlinePeople]);

  useEffect(() => {
    if (selectedUserId) {
      axios.get("/messages/" + selectedUserId).then((res) => {
        setMessages(res.data);
      });
    }
  }, [selectedUserId]);

  const onlinePeopleExclOurUser = { ...onlinePeople };
  delete onlinePeopleExclOurUser[id];

  const messagesWithoutDupes = uniqBy(messages, "_id");

  return (
    <div className="h-screen w-screen flex flex-row bg-one !text-lg !cursor-default">
      <div className=" w-1/4 flex flex-col bg-two m-2 rounded-xl ">
        <div className="w-full flex flex-row justify-center gap-4 items-center p-4">
          <Logo size="32px" />
          <div className="font-semibold text-2xl text-four">ChatChuck</div>
        </div>
        <div className="flex-grow overflow-auto">
          {Object.keys(onlinePeopleExclOurUser).map((userId) => (
            <Contact
              key={userId}
              id={userId}
              online={true}
              username={onlinePeopleExclOurUser[userId] as string}
              onClick={() => {
                setSelectedUserId(userId);
                console.log({ userId });
              }}
              selected={userId === selectedUserId}
            />
          ))}
          {Object.keys(offlinePeople).map((userId) => (
            <Contact
              key={userId}
              id={userId}
              online={false}
              username={offlinePeople[userId].username}
              onClick={() => setSelectedUserId(userId)}
              selected={userId === selectedUserId}
            />
          ))}
        </div>
        <div className="mt-auto w-full p-4 flex flex-row items-center justify-center gap-4">
          {/* <div className="">/ */}
          <div className="flex items-center justify-center gap-2 text-four ">
            <Profile />
            <div className="">{username || "test"}</div>
          </div>
          <button
            className="bg-four px-4 py-2 rounded-xl font-semibold text-one flex items-center justify-center"
            onClick={handleLogout}
          >
            <IoMdLogOut size={"28px"} />
          </button>
        </div>
        {/* </div> */}
      </div>
      <div className="w-3/4 flex flex-col h-full">
        {!!selectedUserId ? (
          <>
            {/* the chat profile info */}
            <div className="h-12 flex flex-row justify-end"></div>
            {/* chat messages for the user and selected profile */}
            <div className="">
              {messagesWithoutDupes.map((message) => (
                <div
                  key={message._id}
                  className={message.sender === id ? "text-right" : "text-left"}
                >
                  <div
                    className={
                      "text-left inline-block p-2 my-2 rounded-md text-sm " +
                      (message.sender === id
                        ? "bg-blue-500 text-white"
                        : "bg-white text-gray-500")
                    }
                  >
                    {message.text}
                    {message.file && (
                      <div className="">
                        <a
                          target="_blank"
                          className="flex items-center gap-1 border-b"
                          href={
                            axios.defaults.baseURL + "/uploads/" + message.file
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18.97 3.659a2.25 2.25 0 00-3.182 0l-10.94 10.94a3.75 3.75 0 105.304 5.303l7.693-7.693a.75.75 0 011.06 1.06l-7.693 7.693a5.25 5.25 0 11-7.424-7.424l10.939-10.94a3.75 3.75 0 115.303 5.304L9.097 18.835l-.008.008-.007.007-.002.002-.003.002A2.25 2.25 0 015.91 15.66l7.81-7.81a.75.75 0 011.061 1.06l-7.81 7.81a.75.75 0 001.054 1.068L18.97 6.84a2.25 2.25 0 000-3.182z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {message.file}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={divUnderMessages}></div>
            </div>
            {/* input new text for chat */}
            {/* <form onSubmit={() => console.log('form submitted')} > */}
              <form className="mt-auto h-16 flex flex-row justify-around items-center p-4 gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                console.log('form submitted')
                }}>
                <input
                  className="flex-1 h-12 outline-none border-2 border-four rounded-xl px-4 bg-one "
                  type="text"
                  placeholder="Type a message..."
                />
                <label className="p-4 rounded-full bg-four flex items-center justify-center cursor-pointer">
                  <input type="file" className="hidden" />
                  <PiLinkSimpleBold size={"20px"} className="text-white" />
                </label>
                <button type="submit" className="p-4 rounded-full bg-four">
                  <BiSolidSend size={"20px"} className="text-white" />
                </button>
              </form>{" "}
            {/* </form> */}
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center text-three flex-col">
            <div className="font-semibold text-3xl">No chat selected</div>
            <div>Select a profile to begin/continue chatting</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatTemp;
