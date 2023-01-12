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
    const [show, setShow] = useState(false);
    const [usersWantMadeFriend, setUserWantMakeFriend] = useState([]);
    const [friends, setFriends] = useState([]);
    const navigate = useNavigate();
    // const showNofication = () => {
    //     setShow(true)
    // }

    const getListFriend = async () => {
        const result = await Auth.getListFriend(user.uid);
        setTimeout(() => {
            setFriends(result.data);
        }, 300);

        console.log(friends)
    }

    useEffect(() => {
        Auth.fetchProfile()
            .then((resolve) => {
                setTimeout(() => {
                    setUser(resolve.data);
                }, 2000);

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
            .catch(() => {
                console.log("Lỗi fetch")
            })

        getListFriend();

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

    return (
        <>
            <Row>
                <Col span={3}>
                    <Sidebar onClickMenu={onClickMenu} user={user} show={show} />
                </Col>
                <Col span={5}>
                    <ChatPanel friends={friends} />
                </Col>
                <Col span={16}>
                    <Routes>
                        <Route>
                            <Route path="/" index element={<HistoryChat />} />
                            <Route path="addfriend" element={<AddFriend test="duong" users={usersWantMadeFriend} />} />
                        </Route>
                    </Routes>
                    {/* <HistoryChat /> */}
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