import React from "react";
import ChatSvg from "./assets/chat-line-svgrepo-com.svg";

const Logo = () => {
  return (
    <div className="text-blue-600 font-bold flex gap-2 p-4">
      {ChatSvg}
      ChatChuck
    </div>
  );
};

export default Logo;
