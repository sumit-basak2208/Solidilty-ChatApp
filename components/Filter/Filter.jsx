import React, { useState, useContext } from 'react'
import Image from "next/image";

//INTERNAL IMPORTS
import Style from './Filter.module.css'
import images from "../../assets";
import { ChatappContext } from "../../Context/ChatAppContext";
import { Model } from "../index";

const Filter = () => {
  const {account, addfriend} = useContext(ChatappContext)

  //USESTATE
  const [addFriend, setAddFriend] = useState(false);

  return (
    <div className={Style.Filter}>
      <div className={Style.Filter_box}>
        <div className={Style.Filter_box_left}>
          <div className={Style.Filter_box_left_search}>
            <Image src={images.search} alt="search" width={20} height={20}/>
            <input placeholder='Search...'/>
          </div>
        </div>
        <div className={Style.Filter_box_right}>
          <button>
            <Image src={images.clear}
            alt="clear" width={20} height={20}/>
            CLEAR CHAT
          </button>
          <button onClick={() => setAddFriend(true)}>
            <Image src={images.user}
            alt="clear" width={20} height={20}/>
            ADD FRIEND
          </button>
        </div>
      </div>

      {/*MODEL COMPONENT */}
      { addFriend && (
        <div className={Style.Filter_model}>
          <Model 
          openBox={setAddFriend}
          title="WELCOME TO"
          head="CHAT BUDDY"
          info="Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum sit doloribus quod vel expedita, dicta voluptatibus, nemo, deserunt minima quis recusandae porro officiis modi fugiat libero tempora corporis necessitatibus itaque!"
          smallInfo="Kindly select your friend name & address"
          image={images.hero}
          functionName={addFriend}/>
        </div>
      )}
    </div>
  )
}

export default Filter