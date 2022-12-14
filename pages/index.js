import React, { useEffect, useState, useContext } from "react";

//INTERNAL IMPORT
import { ChatappContext } from "../Context/ChatAppContext";
import { Filter, Friend } from "../components";

const ChatApp = () => {
  const {} = useContext(ChatappContext);
  return (
    <div>
      <Filter />
      <Friend />
    </div>
  );
};

export default ChatApp;
