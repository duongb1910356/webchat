import React, { useContext, useState, useEffect } from "react";
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

export default function Chat() {
    const { user, setUser } = useContext(UserContext);
    const [userCurrentChat, setUserCurrentChat] = useState({});

    const [show, setShow] = useState(false);
    const [usersWantMadeFriend, setUserWantMakeFriend] = useState([]);
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    // const showNofication = () => {
    //     setShow(true)
    // }



    useEffect(() => {
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

        return () => {
            socket.removeAllListeners()
        }
    }, [usersWantMadeFriend]);

    const onClickMenu = (e) => {
        if (e.key == "noficiation") {
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
        // console.log(item)
        // let list = [];
        // list.push(item);
        // await setTimeout(() => {
        //     setUserCurrentChat(list)
        // },[2000])
        // console.log("from chat SocketID", userCurrentChat)
        // alert("from chat SocketID" + userCurrentChat.socketID)
        setUserCurrentChat(item);
        // console.log(typeof(item))

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
                            <Route path="/" index element={<HistoryChat userCurrentChat={userCurrentChat}/>} />
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