import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

//INTERNAL IMPORTS
import Style from "./Card.module.css"
import images from "../../../assets";


const Card = ({el, i, readMessage, readUser}) => {
  return (
     <Link href={{pathname: "/", query: {name:`${el.name}`, address: `${el.pubKey}`},}}>
        <div className={Style.Card} onClick={() => (readUser(el.pubKey), readMessage(el.pubKey))}>
            <div className={Style.Card_box}>
                <div className={Style.Card_box_left}>
                    <Image src={images.accountName}
                    alt="Username"
                    width={50}
                    height={50}
                    className={Style.Card_box_left_img}/>
                </div>
                <div className={Style.Card_box_right}>
                    <div className={Style.Card_box_right_middle}>
                        <h4>{el.name}</h4>
                        <small>{el.pubKey.slice(0, 21)}...</small>
                    </div>
                    <div className={Style.Card_box_right_end}>
                        <small>{i+1}</small>
                    </div>
                </div>
            </div>
        </div>
     </Link>
    )
}

export default Card