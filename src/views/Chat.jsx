import React, { useContext, useState, useEffect, useRef } from "react";
import { Col, Row, Button, notification, Space, Modal, Spin, Avatar, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';
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
// import { openStream, playStream, stopStream, call } from "../service/Stream";
import { Peer } from "peerjs";
import StreamRTC from "../service/Stream";
import phoneGif from "../asset/iconphonerang.gif";

var config = {}
const streamService = new StreamRTC(config);
const arrStreams = []

export default function Chat() {
    const videoCaller = useRef(null);
    const [messageApi, contextHolderMessage] = message.useMessage();
    const { user, setUser } = useContext(UserContext);
    const { friends, setFriends } = useContext(FriendContext);
    const [userCurrentChat, setUserCurrentChat] = useState({});
    const [messages, setMessages] = useState([{}]);
    const [show, setShow] = useState(false);
    const [usersWantMadeFriend, setUserWantMakeFriend] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalVideoCallOpen] = useState(false);
    const [isCalling, setIsCalling] = useState(false);
    const [callMediaConection, setCallMediaConection] = useState();
    const [toPeer, setToPeer] = useState("")
    const [idPeer, setIdPeer] = useState("");
    const [accept, setAccept] = useState(false)
    const peer = new Peer();
    const [userWait, setUserWait] = useState();
    const [isOpenModalCall, setIsOpenModalCall] = useState(false);
    const [closeConnect, setCloseConnect] = useState(false);
    // const [configCall, setConfigCall] = useState();

    const timeoutWaiting = () => {
        messageApi.open({
            type: 'error',
            content: 'Người nhận không phản hồi',
        });
    };

    const createElementVideo = (stream, userCall = user) => {
        const video = document.createElement("video");
        if (config.video == false) {
            console.log(config)
            video.poster = userCall.photoURL;
        } else {
            video.srcObject = stream;
            video.play();
        }
        video.height = 200;
        video.width = 280;
        return video;
    }

    const call = (toPeer) => {
        console.log("configCall from function call : ", config)
        navigator.mediaDevices.getUserMedia(config)
            .then((stream) => {
                arrStreams.push(stream);
                setUserWait(userCurrentChat);
                const localStream = document.getElementById("localstream");
                const videoCaller = createElementVideo(stream);
                localStream.appendChild(videoCaller);

                const options = { metadata: { "userCall": user, "config": config, "userRecieve": userCurrentChat } };
                const call = peer.call(toPeer, stream, options);
                setCallMediaConection(call);
                call.on("stream", remoteStream => {
                    const videoCallee = createElementVideo(remoteStream, userCurrentChat);
                    const divremote = document.getElementById("remotestream");
                    divremote.appendChild(videoCallee);
                    setAccept(true)
                })
            })
            .catch(error => {
                console.log("Loi navigator >> ", error);
            })
    }

    useEffect(() => {
        peer.on('open', id => {
            setIdPeer(id)
        });
        
    }, []);

    // useEffect(() => {
    //     if (friends[0] == undefined) return;
    //     console.log("friends: ", Object.values(friends[0])[0]);
    //     setUserCurrentChat(Object.values(friends[0])[0]);
    // }, [friends])

    useEffect(() => {
        peer.on("call", call => {
            console.log("User <<>> ", user);
            if (call.metadata.userCall.username != undefined) {
                setIsModalVideoCallOpen(true);
                setCallMediaConection(call);
                config = call.metadata.config;
                navigator.mediaDevices.getUserMedia(config)
                    .then((stream) => {
                        setIsModalVideoCallOpen(true);
                        arrStreams.push(stream);
                        call.answer(stream);

                        const localStream = document.getElementById("localstream");
                        const videoCaller = createElementVideo(stream, call.metadata.userRecieve);
                        localStream.appendChild(videoCaller);

                        call.on("stream", remoteStream => {
                            const divremote = document.getElementById("remotestream");
                            console.log("user wait ?? ", userWait);
                            const videoCallee = createElementVideo(remoteStream, call.metadata.userCall);
                            divremote.appendChild(videoCallee);
                        })
                    })
            }
        })
    }, [userWait])

    const [api, contextHolder] = notification.useNotification();
    const close = () => {
        console.log(
            'Notification was closed. Either the close button was clicked or duration time elapsed.',
        );
    };

    const acceptCallee = () => {
        reply(idPeer, 'responseDetectPeerID');
        setIsOpenModalCall(false);
        setIsModalVideoCallOpen(true);
    }

    const callVoice = async () => {
        config = { audio: true, video: false }
        // alert("voice")
        setIsOpenModalCall(true);
        sendMessage(idPeer, "detectPeerID");
        setTimeout(() => {
            setIsOpenModalCall(false);
        }, 60000);

    }

    const callVideo = async () => {
        config = { audio: false, video: true }
        setIsOpenModalCall(true);
        sendMessage(idPeer, "detectPeerID");
        setTimeout(() => {
            setIsOpenModalCall(false);
        }, 60000);
    }

    const destroyVideoCall = () => {
        console.log("callMediaConection ", callMediaConection);
        setIsModalVideoCallOpen(false);
        setUserWait(null);
        arrStreams.map(stream => {
            console.log("map stream ", stream)
            stream.getTracks().forEach(function (track) {
                console.log(track)
                track.stop();
            })
        });
        callMediaConection.close();
        document.getElementById("localstream").innerHTML = "";
        document.getElementById("remotestream").innerHTML = "";
    }

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

        return () => {
            socket.removeAllListeners()
        }
    }, [usersWantMadeFriend]);

    useEffect(() => {
        if (closeConnect == false) return;
        destroyVideoCall();
        setCloseConnect(false);
        console.log("setcloseconnect")
    }, [closeConnect])

    useEffect(() => {
        console.log("change chat");
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
            switch (type) {
                case "img":
                case "text":
                    friends[0].map(async (element, index) => {
                        if (element.uid == userSend.uid) {
                            await element.messages?.push(msg);
                            element.hasNewMessage = true;
                        }
                    })
                    setMessages([...messages, msg]);
                    break;

                case "detectPeerID":
                    setIsOpenModalCall(true);
                    setUserWait(userSend);
                    setTimeout(() => {
                        setIsOpenModalCall(false);
                    }, 60000);
                    break;

                case "responseDetectPeerID":
                    console.log("responseDetectPeerID >> ", content);
                    setIsModalVideoCallOpen(true);
                    setIsOpenModalCall(false);
                    call(content);
                    break;

                case "closeConnectCall":
                    console.log(content)
                    setCloseConnect(true);

                default:
                    break;

            }

        })

        return () => {
            socket.removeListener(["private message"])
        }
    }, [socket, userCurrentChat, friends])

    useEffect(() => {
        friends[0]?.map(async (element) => {
            const result = element.uid.localeCompare(user.uid);
            const id = (result == 1 ? element.uid + user.uid : user.uid + element.uid);
            const listMess = await (await Message.getMessage(id)).data.messages;
            if (listMess) {
                element.messages = listMess;
                // console.log("friends.messages ", element.messages)
                // console.log("User ", id, " : ", listMess)
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


    useEffect(() => {
        console.log("USER CURRENT CHAT ", userCurrentChat);
        console.log("Messages ", messages);
    }, [messages, userCurrentChat]);

    const selectFriend = (item) => {
        item.hasNewMessage = false;
        setMessages(item.messages);
        setUserCurrentChat(item);
        navigate("/chat");
    }

    const reply = (idPeer, type) => {
        console.log("userwait reply >> ", userWait);
        socket.emit("private message", {
            content: idPeer,
            to: userWait.uid,
            date: new Date().toLocaleString(),
            userSend: user,
            userRecieve: {
                uid: userWait.uid,
                photoURL: userWait.photoURL
            },
            type: type,
        })
    }

    const sendMessage = async (content, type, userRecieve = userCurrentChat) => {
        if (userRecieve.uid) {
            console.log("SENDTO SOCKETID >> ", userRecieve.uid)
            socket.emit("private message", {
                content,
                to: userRecieve.uid,
                date: new Date().toLocaleString(),
                userSend: user,
                userRecieve: {
                    uid: userRecieve.uid,
                    photoURL: userRecieve.photoURL
                },
                type: type,
            });
            const msg = {
                content,
                from: socket.id,
                date: new Date().toLocaleString(),
                userSend: user,
                userRecieve: {
                    uid: userRecieve.uid,
                    photoURL: userRecieve.photoURL
                },
                type: type,
            }
            // setMessages([...messages, msg])
            if (type == "text" || type == "img") {
                await userRecieve.messages?.push(msg);
                setMessages([...messages, msg]);
            }
            console.log("send message >> ", msg)

        }
    }

    return (
        <>
            {contextHolder}
            {contextHolderMessage}
            <Modal width={750} title="Video Call" open={isModalOpen}
                onCancel={() => {
                    sendMessage("want close media connection", "closeConnectCall", userWait)
                    destroyVideoCall();
                }}
                onOk={acceptCallee} okText={"Nhận"} cancelText={"Huỷ"}
            >
                <Row justify="space-between">
                    <Col span={11} id="remotestream">
                        {/* <video id="videoCallee" controls={false} width={"100%"} height={300}>
                        </video> */}
                    </Col>
                    <Col span={11} id="localstream">
                        {/* <video id="videoCaller" controls={false} width={"100%"} height={300}>
                        </video> */}
                    </Col>
                </Row>
            </Modal>

            <Modal width={400} title={userWait ? "Cuộc gọi đến" : "Cuộc gọi đi"} open={isOpenModalCall} onOk={acceptCallee} onCancel={() => { setIsOpenModalCall(false) }}>
                <Row justify="space-between">
                    <Col span={24}>
                        <div style={{ display: "flex", justifyContent: "center", height: "50%", alignItems: "center" }}>
                            <Spin tip="Đang gọi...">
                                <Avatar src={userWait ? userWait?.photoURL : userCurrentChat.photoURL} size={100} icon={<UserOutlined />} />
                            </Spin>
                        </div>
                    </Col>
                </Row>
            </Modal>

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
                            <Route path="/" index element={<HistoryChat callVoice={callVoice} callVideo={callVideo} messages={userCurrentChat.messages} sendMessage={sendMessage} userCurrentChat={userCurrentChat} />} />
                            <Route path="addfriend" element={<AddFriend test="duong" users={usersWantMadeFriend} />} />
                        </Route>
                    </Routes>
                </Col>
            </Row>
        </>
    )
}
