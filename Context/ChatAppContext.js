import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

//INTERNAL IMPORTS
import {
  checkIfWalletConnected,
  connectWallet,
  connectingWithContract,
  convertTime,
} from "../utils/apiFeature";

export const ChatappContext = React.createContext();

export const ChatAppProvider = ({ children }) => {
  // USESTATE
  const [account, setAccount] = useState("");
  const [userName, setUserName] = useState("");
  const [friendLists, setFriendLists] = useState([]);
  const [friendMsg, setFriendMsg] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLists, setUserLists] = useState([]);
  const [error, setError] = useState("");

  //CHAT USER DATA
  const [currentUserName, setCurrentUserName] = useState("");
  const [currentUserAddress, setCurrentUserAddress] = useState("");

  const router = useRouter();

  //FETCH DATA TIME OF PAGE LOAD
  const fetchData = async () => {
    try {
      //GET CONTRACT
      const contract = await connectingWithContract();
      //GET AACOUNT
      const connectAccount = await connectWallet();
      setAccount(connectAccount);
      //GET USER NAME
      const userName = await contract.getUserName(connectAccount);
      setUserName(userName);
      //GET FRIEND LIST
      const friendList = await contract.getFriendList();
      setFriendLists(friendList);
      //GET ALL APP USER
      const userList = await contract.getAllUsersApp();
      setUserLists(userList);
    } catch (error) {
      setError("Please install and connect your wallet");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //READ MESSAGE
  const readMessage = async (friendAddress) => {
    try {
      const contract = await connectingWithContract();
      const read = await contract.readMessage(friendAddress);
      setFriendMsg(read);
    } catch (error) {
      setError("Currently you have no message");
    }
  };

  //CREATE AACOUNT
  const createAccount = async ({ name }) => {
    try {
      if (!name) return setError("Name cannot be empty");
      const contract = await connectingWithContract();
      const getCreatedUser = await contract.createAccount(name);
      setLoading(true);
      await getCreatedUser.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Error while creating an account please reload and try again");
    }
  };

  //ADD YOUR FRIEND
  const addFriend = async ({ name, accountAddress }) => {
    try {
      if (!name || !accountAddress)
        return setError("Please provide friend's name and accountAddress");
      const contract = await connectingWithContract();
      const addMyFriend = await contract.addFriend(accountAddress, name);
      setLoading(true);
      await addMyFriend.wait();
      setLoading(false);
      router.push("/");
      window.location.reload();
    } catch (error) {
      setError("Something went wrong, Please try again");
      console.log(error);
    }
  };

  //SEND MESSAGE
  const sendMessage = async (address, msg) => {
    try {
      if (!msg || !address) return setError("Please type your contract");
      console.log(msg, address);
      const contract = await connectingWithContract();
      const addMessage = await contract.sendMessage(address, msg);
      setLoading(true);
      await addMessage.wait();
      setLoading(false);
      window.location.reload();
    } catch (error) {
      setError("Please reload and try again");
      console.log(error);
    }
  };

  //READ USER
  const readUser = async (userAddress) => {
    try {
      const contract = await connectingWithContract();
      const userName = await contract.getUserName(userAddress);
      setCurrentUserName(userName);
      setCurrentUserAddress(userAddress);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ChatappContext.Provider
      value={{
        readMessage,
        createAccount,
        addFriend,
        sendMessage,
        readUser,
        checkIfWalletConnected,
        connectWallet,
        account,
        userName,
        friendLists,
        friendMsg,
        loading,
        userLists,
        error,
        currentUserName,
        currentUserAddress,
      }}
    >
      {children}
    </ChatappContext.Provider>
  );
};
