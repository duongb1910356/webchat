import React, { useContext, useState, useEffect, useCallback } from "react";
import { Col, Row } from 'antd';
import Sidebar from "../components/Sidebar";
import ChatPanel from "../components/ChatPanel";
import HistoryChat from "../components/HistoryChat";
import Auth from "../service/Auth";
import UserContext from "../contexts/UserContext";
import socket from "../socket";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "../components/Test";
import AddFriend from "../components/AddFriend";
import { useNavigate, Link } from "react-router-dom"; //import module điều hướng
import FriendContext from "../contexts/FriendContext";
import { Helmet } from "react-helmet";
import Message from "../service/Message";

export default function Chat() {
    const { user, setUser } = useContext(UserContext);
    const { friends, setFriends } = useContext(FriendContext);
    const [userCurrentChat, setUserCurrentChat] = useState({});
    const [messages, setMessages] = useState([{}]);
    const [show, setShow] = useState(false);
    const [usersWantMadeFriend, setUserWantMakeFriend] = useState([]);
    // const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    // const showNofication = () => {
    //     setShow(true)
    // }

    const callBackRecieveMessage = ({ content, from, date, userSend, userRecieve }) => {
        const msg = {
            content,
            from: from,
            date: date,
            userSend: userSend,
            userRecieve: userRecieve
        }
        console.log("msg ", msg)
        // await userCurrentChat.messages?.push(msg);
        // setMessages([...messages, msg])

        console.log("from on prite ", userCurrentChat.messages)
    }

    useEffect(() => {
        const fetchProfile = () => {
            Auth.fetchProfile()
                .then((resolve) => {
                    setTimeout(() => {
                        setUser(resolve.data);
                    }, 3000);

                    const sessionID = localStorage.getItem("sessionID");
                    if (sessionID) {
                        socket.auth = { sessionID };
                    } else {
                        let uid = user.uid;
                        let email = user.email;
                        let username = user.username;
                        let photoURL = user.photoURL;
                        // console.log(">>>",username);
                        socket.auth = { uid, email, username, photoURL };
                    }
                    socket.connect()

                })
                .catch((error) => {
                    console.log(error, "Lỗi fetch")
                })
        }

        fetchProfile()


        socket.on("session", ({ sessionID, id }) => {
            console.log("session >>>", sessionID);
            socket.auth = { sessionID };
            localStorage.setItem("sessionID", sessionID);
            socket.id = id;
        })

        socket.on("updateListFriend", () => {
            console.log("update friend: ", socket.id)

        });

        console.log("usersWantMadeFriend >>", usersWantMadeFriend)

        socket.on("require add friend", ({ content, from }) => {
            console.log("from: ", from)
            setUserWantMakeFriend(prevState =>
                [...usersWantMadeFriend, content]
            );

            console.log("usersWantMadeFriend >>>>", usersWantMadeFriend)
            setShow(true)
        });

        // socket.on("private message", async ({ content, from, date, userSend, userRecieve }) => {
        //     const msg = {
        //         content,
        //         from: from,
        //         date: date,
        //         userSend: userSend,
        //         userRecieve: userRecieve
        //     }
        //     console.log("msg ", msg)
        //     await userCurrentChat.messages?.push(msg);
        //     // setMessages([...messages, msg])

        //     console.log("from on prite ", userCurrentChat.messages)

        // })



        return () => {
            socket.removeAllListeners()
        }
    }, [usersWantMadeFriend]);

    useEffect(() => {
        console.log("change chat")
        socket.on("private message", async ({ content, from, date, userSend, userRecieve, type }) => {
            const msg = {
                content,
                from: from,
                date: date,
                userSend: userSend,
                userRecieve: userRecieve,
                type: type,
            }
            console.log("msg ", msg);
            friends[0].map(async (element, index) => {
                if (element.uid == userSend.uid) {
                    await element.messages?.push(msg);
                    element.hasNewMessage = true;
                }
            })
            setMessages([...messages, msg])
        })

        return () => {
            socket.removeListener("private message")
        }
    }, [socket, userCurrentChat, friends])

    useEffect(() => {
        friends[0]?.map(async (element) => {
            const result = element.uid.localeCompare(user.uid);
            const id = (result == 1 ? element.uid + user.uid : user.uid + element.uid);
            const listMess = await (await Message.getMessage(id)).data.messages;
            if (listMess) {
                element.messages = listMess;
                console.log("friends.messages ", element.messages)
                console.log("User ", id, " : ", listMess)
            }
        })
    }, [friends])

    const onClickMenu = (e) => {
        if (e.key === "noficiation") {
            setShow(false)
            navigate("addfriend")
            // console.log(show)
        }
    }

    const selectFriend = (item) => {
        item.hasNewMessage = false;
        setMessages(item.messages)
        setUserCurrentChat(item);
        navigate("/chat");
    }

    const sendMessage = async (content, type) => {
        if (userCurrentChat.socketID) {
            socket.emit("private message", {
                content,
                to: userCurrentChat.socketID,
                date: new Date().toLocaleString(),
                userSend: user,
                userRecieve: {
                    uid: userCurrentChat.uid,
                    photoURL: userCurrentChat.photoURL
                },
                type: type,
            });
            const msg = {
                content,
                from: socket.id,
                date: new Date().toLocaleString(),
                userSend: user,
                userRecieve: {
                    uid: userCurrentChat.uid,
                    photoURL: userCurrentChat.photoURL
                },
                type: type,
            }
            // setMessages([...messages, msg])
            await userCurrentChat.messages?.push(msg);
            setMessages([...messages, msg])
            console.log("send message ", messages)

        }
    }

    return (
        <>
            <Row>
                <Col span={3}>
                    <Sidebar onClickMenu={onClickMenu} user={user} show={show} />
                </Col>
                <Col span={5}>
                    <ChatPanel selectFriend={selectFriend} />
                </Col>
                <Col span={16}>
                    <Routes>
                        <Route>
                            <Route path="/" index element={<HistoryChat messages={userCurrentChat.messages} sendMessage={sendMessage} userCurrentChat={userCurrentChat} />} />
                            <Route path="addfriend" element={<AddFriend test="duong" users={usersWantMadeFriend} />} />
                        </Route>
                    </Routes>
                </Col>
            </Row>
        </>
    )
}
