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
import { async } from "@firebase/util";

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
        socket.on("private message", async ({ content, from, date, userSend, userRecieve }) => {
            const msg = {
                content,
                from: from,
                date: date,
                userSend: userSend,
                userRecieve: userRecieve
            }
            console.log("friends ", friends);
            friends[0].map(async (element, index) => {
                if (element.uid == userSend.uid){
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


    const onClickMenu = (e) => {
        if (e.key === "noficiation") {
            setShow(false)
            navigate("addfriend")
            // console.log(show)
        }
    }



    // const sendMessage = (content) => {
    //     console.log("userCurrentChat.socketID >>> ", userCurrentChat.socketID)
    //     if (userCurrentChat.socketID) {
    //         socket.emit("private message", {
    //             content,
    //             to: userCurrentChat.socketID,
    //         });
    //     }
    // }
    const selectFriend = (item) => {
        item.hasNewMessage = false;
        setMessages(item.messages)
        setUserCurrentChat(item);
        navigate("/chat");
    }

    const sendMessage = async (content) => {
        // const message = props.userCurrentChat.messages.concat(content)
        // props.userCurrentChat.messages = message;
        // console.log("userCurrentChat >>> ", props.userCurrentChat.messages.length);
        if (userCurrentChat.socketID) {
            socket.emit("private message", {
                content,
                to: userCurrentChat.socketID,
                date: new Date().toLocaleString(),
                userSend: user,
                userRecieve: {
                    uid: userCurrentChat.uid,
                    photoURL: userCurrentChat.photoURL
                }
            });
            const msg = {
                content,
                from: socket.id,
                date: new Date().toLocaleString(),
                userSend: user,
                userRecieve: {
                    uid: userCurrentChat.uid,
                    photoURL: userCurrentChat.photoURL
                }
            }
            // setMessages([...messages, msg])
            await userCurrentChat.messages?.push(msg);
            setMessages([...messages, msg])
            console.log("send message ", messages)

        }
        // console.log("messages >> ", messages)
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

// class Chat extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             test: "abc",
//             data: [
//                 {
//                     email: "abc@gmail",
//                     image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                     title: "abcsdf",
//                     hasNewMessage: false
//                 },
//                 {
//                     email: "abcfdhhf@gmail",
//                     image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                     title: "abcsddfhfhdfhhff",
//                     hasNewMessage: false
//                 },
//                 {
//                     email: "abcfgdhhf@gmail",
//                     image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                     title: "abcsddfhfhdfhhff",
//                     hasNewMessage: false
//                 },
//                 {
//                     email: "abcasddfdhhf@gmail",
//                     image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                     title: "abcsddfhfhdfhhff",
//                     hasNewMessage: false
//                 },
//                 {
//                     email: "ab4356cfdhhf@gmail",
//                     image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                     title: "abcsddfhfhdfhhff",
//                     hasNewMessage: false
//                 },
//                 {
//                     email: "ab4356c346346fdhhf@gmail",
//                     image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                     title: "abcsddfhfhdfhhff",
//                     hasNewMessage: false
//                 },
//                 {
//                     email: "ab4dfg4535356cfdhhf@gmail",
//                     image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                     title: "abcsddfhfhdfhhff",
//                     hasNewMessage: false
//                 },
//                 {
//                     email: "ab435gdgd6cfdhhf@gmail",
//                     image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                     title: "abcsddfhfhdfhhff",
//                     hasNewMessage: false
//                 }
//             ],
//             user: {}
//         }
//         // this.changeData = this.changeData.bind(this);
//     }

//     componentDidMount() {
//         const obj = JSON.parse(sessionStorage.user);
//         this.setState({ user: obj.data })
//     }

//     componentDidUpdate() {
//         // const obj = JSON.parse(sessionStorage.user);
//         // this.setState({ user: obj.data })
//     }

//     // connectSocket(){
//     //     alert("yes")
//     //     // socket.connect()
//     // }

//     // changeData() {
//     //     this.setState(
//     //         {
//     //             data: this.state.data.map(el => {
//     //                 el.hasNewMessage = (el.email == "abcfdhhf@gmail")
//     //                 return el;
//     //             })
//     //         }
//     //     )
//     //     // console.log(this.state.data)
//     // }

//     render() {
//         const data2 = [
//             {
//                 email: "abcfsetttttttttdhhf@gmail",
//                 image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                 title: "duong",
//                 hasNewMessage: true
//             }
//         ]
//         console.log("caht")
//         return (
//             <>
//                 <Row>
//                     {/* <button onClick={() => { socket.emit("chat message", "dsgg") }}></button> */}
//                     <Col span={2}>
//                         <Sidebar user={this.state.user} friendCount={1} />
//                     </Col>
//                     <Col span={5}>
//                         <ChatPanel data={this.state.data} />
//                     </Col>
//                     <Col span={17}>
//                         <HistoryChat />
//                     </Col>
//                 </Row>
//             </>
//         )
//     }
// }

// export default Chat