import React, { useState, useEffect, useContext } from "react";

//INTERNAL IMPORT
import Style from "../styles/alluser.module.css";
import { UserCard } from "../components/index";
import { ChatappContext } from "../Context/ChatAppContext";

const alluser = () => {
  const { userLists, addFriend } = useContext(ChatappContext);
  return (
    <div>
      <div className={Style.alluser_info}>
        <h1>Find your Friends</h1>
      </div>
      <div className={Style.alluser}>
        {userLists.map((el, i) => (
          <UserCard key={i + 1} el={el} i={i} addFriend={addFriend} />
        ))}
      </div>
    </div>
  );
};

export default alluser;
