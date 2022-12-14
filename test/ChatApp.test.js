const { expect, assert } = require("chai");
const { ethers, network } = require("hardhat");

const DEVELOPER_CHAINS = ["hardhat", "localhost"];
const NAME = "Sumit";
const FRIEND_NAME = "Zeus";
const MSG = "Good Morning!!!!";

!DEVELOPER_CHAINS.includes(network.name)
  ? describe.skip
  : describe("ChatApp", () => {
      let chatApp, accounts;
      beforeEach(async () => {
        accounts = await ethers.getSigners();
        const ChatApp = await ethers.getContractFactory("ChatApp");
        chatApp = await ChatApp.deploy();
      });

      describe("CreateAccount", () => {
        it("Reverts if user is already registered", async () => {
          await chatApp.createAccount(NAME);
          await expect(chatApp.createAccount(NAME)).to.be.revertedWith(
            "User already exists"
          );
        });

        it("Reverts if uresName is empty", async () => {
          await expect(chatApp.createAccount("")).to.be.revertedWith(
            "User name cannot be empty"
          );
        });

        it("Sets userName", async () => {
          await chatApp.createAccount(NAME);
          const name = await chatApp.getUserName(accounts[0].address);
          assert.equal(name, NAME);
        });

        it("Adds user into allUser", async () => {
          await chatApp.createAccount(NAME);
          const allUser = await chatApp.getAllUsersApp();
          assert.equal(allUser.length, 1);
          assert.equal(allUser[0][0], NAME);
          assert.equal(allUser[0][1], accounts[0].address);
        });
      });

      describe("addFriend", () => {
        beforeEach(async () => {
          await chatApp.createAccount(NAME);
        });
        it("Reverts if friend doesnt exist", async () => {
          await expect(
            chatApp.addFriend(accounts[1].address, FRIEND_NAME)
          ).to.be.revertedWith("User does not exist");
        });

        it("Reverts if caller is not registered", async () => {
          await expect(
            chatApp.connect(accounts[1]).addFriend(accounts[0].address, NAME)
          ).to.be.revertedWith("create an account first");
        });

        it("Reverts if sender and friend are same", async () => {
          await expect(
            chatApp.addFriend(accounts[0].address, NAME)
          ).to.be.revertedWith("User cant add themselves as friend");
        });

        it("Reverts if already friends", async () => {
          await chatApp.connect(accounts[1]).createAccount(FRIEND_NAME);
          await chatApp.addFriend(accounts[1].address, FRIEND_NAME);

          await expect(
            chatApp.addFriend(accounts[1].address, FRIEND_NAME)
          ).to.be.revertedWith("Alredy friends");
        });

        it("Adds friend to friendList in msg.sender", async () => {
          await chatApp.connect(accounts[1]).createAccount(FRIEND_NAME);
          await chatApp.addFriend(accounts[1].address, FRIEND_NAME);
          const friendList = await chatApp.getFriendList();
          assert.equal(friendList[0][0], accounts[1].address);
          assert.equal(friendList[0][1], FRIEND_NAME);
        });

        it("Adds msg.sender to friendList of friend", async () => {
          await chatApp.connect(accounts[1]).createAccount(FRIEND_NAME);
          await chatApp.addFriend(accounts[1].address, FRIEND_NAME);
          const friendList = await chatApp.connect(accounts[1]).getFriendList();
          assert.equal(friendList[0][0], accounts[0].address);
          assert.equal(friendList[0][1], NAME);
        });
      });

      describe("sendMessage", () => {
        beforeEach(async () => {
          await chatApp.createAccount(NAME);
          await chatApp.connect(accounts[1]).createAccount(FRIEND_NAME);
          await chatApp.addFriend(accounts[1].address, FRIEND_NAME);
        });

        it("Reverts if friend doesnt exist", async () => {
          await expect(
            chatApp.sendMessage(accounts[2].address, MSG)
          ).to.be.revertedWith("User does not exist");
        });

        it("Reverts if msg.sender doesnt exist", async () => {
          await expect(
            chatApp.connect(accounts[2]).sendMessage(accounts[0].address, MSG)
          ).to.be.revertedWith("create an account first");
        });

        it("Reverts if msg.sender and friend is not friend", async () => {
          await chatApp.connect(accounts[2]).createAccount(FRIEND_NAME);
          await expect(
            chatApp.connect(accounts[2]).sendMessage(accounts[0].address, MSG)
          ).to.be.revertedWith("Not friends");
        });

        it("It saves message", async () => {
          await chatApp.sendMessage(accounts[1].address, MSG);
          const blockNum = await ethers.provider.getBlockNumber();
          const block = await ethers.provider.getBlock(blockNum);
          const timestamp = block.timestamp;
          const message = await chatApp
            .connect(accounts[1])
            .readMessage(accounts[0].address);
          assert.equal(message[0][0], accounts[0].address);
          assert.equal(message[0][1].toNumber(), timestamp);
          assert.equal(message[0][2], MSG);
        });
      });
    });
