import React,{useState, useContext} from 'react'

//INTERANL IMPORTS
import Style from './Friend.module.css'
import Card from "./Card/Card"
import Chat from "./Chat/Chat"
import images from "../../assets"

import {ChatappContext} from "../../Context/ChatAppContext"

const Friend = () => {
  const {sendMessage, friendLists, readMessage, account,userName, loading, currentUserName, currentUserAddress, readUser, friendMsg} = useContext(ChatappContext)
  console.log(friendLists)
  return (
    <div className={Style.Friend}>
      <div className={Style.Friend_box}>
        <div className={Style.Friend_box_left}>
          {
            friendLists.map((el, i) => (
              <Card key={i+1}
              el={el}
              i={i} 
              readMessage={readMessage}
              readUser={readUser}
              />
            ))
          }
        </div>
        <div className={Style.Friend_box_right}>
          <Chat functionName={sendMessage}
          readMessage={readMessage}
          readUser={readUser}
          friendMsg={friendMsg}
          account={account}
          userName={userName}
          loading={loading}
          currentUserName={currentUserName}
          currentUserAddress={currentUserAddress}/>
        </div>
      </div>
    </div>
  )
}

export default Friend