import React, { useContext, useEffect, useState, useCallback } from "react";
import { Breadcrumb, Layout, Menu, theme, Avatar, List, Badge, Button, Card, message, Upload } from 'antd';
import { PhoneOutlined, VideoCameraOutlined, SendOutlined, UploadOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Alert, Space, Input } from 'antd';
import socket from "../socket";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";

const { Header, Content, Footer } = Layout;
const { Search } = Input;
const storage = getStorage();

function HistoryChat(props) {
    const { Meta } = Card;
    const { user, setUser } = useContext(UserContext);
    const { friends, setFriends } = useContext(FriendContext);
    const [messages, setMessages] = useState([]);
    const [textMessage, setTextMessage] = useState("");


    useEffect(() => {
        console.log("change history chat")
    }, [props.messages])

    const chatFromFriend = {
        alignSelf: "flex-start",
        marginBottom: "10px"
    }
    const chatFromSelf = {
        alignSelf: "flex-end",
        marginBottom: "10px",
    }
    const list = []
    const listChat = () => {
        listChat = []

        return listChat;
    }

    const uploadImageOnly = {
        // name: 'file',
        // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        // headers: {
        //     authorization: 'authorization-text',
        // },
        showUploadList: false,
        beforeUpload: async (file) => {
            // const url = "https://firebasestorage.googleapis.com/v0/b/socialmedia-c3d70.appspot.com/o/c0ae3e67-0da3-4d12-b927-b6c471f4f900sladbia.png?alt=media&token=311705c7-2906-435f-9d9a-6b9e24cc6707"
            // props.sendMessage(url, "img")

            const imgRef = ref(storage, props.userCurrentChat.uid + "slad" + file.name);
            uploadBytes(imgRef, file)
                .then(() => {
                    getDownloadURL(imgRef)
                        .then((url) => {
                            console.log("URL ", url);
                            props.sendMessage(url, "img")
                        })
                        .catch((error) => {
                            console.log("Error get url img send ", error)
                        })
                })
                .catch((er) => {
                    console.log("Error upload img sending ", er)
                })
            console.log("file name ", file.name)
            return false;
        },
        onChange: (info) => {
            // console.log(info.fileList[0]);
        },


    };

    return (
        <>
            <Layout style={{ height: "100vh", background: "" }}>
                <Header
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%',
                        backgroundColor: "#fff",
                        borderLeft: "thin solid #d9d9d9",
                        borderBottom: "thin solid #d9d9d9",
                        height: "10%",
                        display: "flex",
                        alignItems: "center",
                        display: "flex",
                    }}
                >

                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                        <Card
                            size="small"
                            style={{ border: "none" }}
                        >
                            <Meta
                                style={{ padding: "0px 0px !important" }}
                                avatar={<Avatar src={props.userCurrentChat.photoURL} />}
                                title={props.userCurrentChat.username}
                                description={props.userCurrentChat.email}
                            />
                        </Card>

                        <div >
                            <Button style={{ marginRight: "15px" }} icon={<PhoneOutlined />}></Button>
                            <Button icon={<VideoCameraOutlined />}></Button>
                        </div>

                    </div>
                </Header>
                <Content
                    className="site-layout"
                    style={{
                        padding: '0 30px',
                        borderLeft: "thin solid #d9d9d9",
                        backgroundColor: "#fff",
                        overflow: "hidden"
                    }}
                >
                    <div id="scrollableDiv"
                        style={{
                            marginTop: "20px",
                            height: "95%",
                            overflow: 'auto',
                            paddingRight: "15px"
                        }}
                    >
                        <InfiniteScroll
                            dataLength={props.messages || 0}
                            hasMore={props.messages < 50}
                            scrollableTarget="scrollableDiv"
                        >
                            <ul style={{ listStyleType: "none", display: "flex", flexDirection: "column" }}>
                                {
                                    props.messages?.map((me) => {
                                        return (
                                            <li
                                                key={me.date}
                                                style={me.from != socket.id ? chatFromFriend : chatFromSelf}
                                            >
                                                <Avatar style={me.from != socket.id ? { float: "left" } : { float: "right" }} src={me.userSend.photoURL} /> <br />
                                                <Space
                                                    direction="vertical"
                                                    style={{
                                                        maxWidthwidth: '70%',
                                                        paddingTop: "5px"
                                                    }}
                                                >
                                                    {me.type == "img" && <img height={"220px"} src={me.content} alt="" />}
                                                    {me.type == 'text' &&
                                                        <Alert
                                                            message={me.content}
                                                            description={me.date}
                                                            type={me.from == socket.id ? "success" : "info"}
                                                        />
                                                    }
                                                </Space>
                                            </li>
                                        )
                                        // if (me.type == "img") {

                                        // } else {
                                        //     return (
                                        //         <li
                                        //             key={me.date}
                                        //             style={me.from != socket.id ? chatFromFriend : chatFromSelf}>
                                        //             <Avatar style={me.from != socket.id ? { float: "left" } : { float: "right" }} src={me.userSend.photoURL} /> <br />
                                        //             <Space
                                        //                 direction="vertical"
                                        //                 style={{
                                        //                     maxWidthwidth: '70%',
                                        //                 }}
                                        //             >
                                        //                 <Alert
                                        //                     message={me.content}
                                        //                     description={me.date}
                                        //                     type={me.from == socket.id ? "success" : "info"}
                                        //                 />
                                        //             </Space>
                                        //         </li>
                                        //     )
                                        // }
                                    })
                                }

                            </ul>
                        </InfiniteScroll>
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                        borderLeft: "thin solid #d9d9d9",
                        borderTop: "thin solid #d9d9d9",
                        height: "15%",
                        padding: '0 50px',
                        backgroundColor: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                    }}
                >
                    <Upload accept=".png, .jpg" {...uploadImageOnly}>
                        <Button icon={<UploadOutlined />}>Gửi hình ảnh</Button>
                    </Upload>
                    <Input style={{ maxWidth: "80%" }} onChange={(e) => setTextMessage(e.target.value)} value={textMessage} size="large" placeholder="Nhập tin nhắn..." />
                    <Button onClick={() => { props.sendMessage(textMessage, "text"); setTextMessage(''); }} icon={<SendOutlined />}></Button>
                </Footer>
            </Layout>
        </>
    )
}


export default HistoryChat