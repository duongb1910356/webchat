import React, { useContext, useEffect, useState } from "react";
import { Breadcrumb, Layout, Menu, theme, Avatar, List, Badge, Button, Card, message } from 'antd';
import { PhoneOutlined, VideoCameraOutlined, SendOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Alert, Space, Input } from 'antd';
import socket from "../socket";
import UserContext from "../contexts/UserContext";
import FriendContext from "../contexts/FriendContext";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function HistoryChat(props) {
    const { Meta } = Card;
    const { user, setUser } = useContext(UserContext);
    const { friends, setFriends } = useContext(FriendContext);
    // const [messages, setMessages] = useState([]);
    const [textMessage, setTextMessage] = useState("");

    // const sendMessage = (content) => {
    //     // const message = props.userCurrentChat.messages.concat(content)
    //     // props.userCurrentChat.messages = message;
    //     // console.log("userCurrentChat >>> ", props.userCurrentChat.messages.length);
    //     // if (props.userCurrentChat.socketID) {
    //     //     socket.emit("private message", {
    //     //         content,
    //     //         to: props.userCurrentChat.socketID,
    //     //         date: new Date().toLocaleString(),
    //     //         userSend: user,
    //     //         userRecieve: props.userCurrentChat
    //     //     });
    //     const msg = {
    //         content,
    //         from: socket.id,
    //         date: new Date().toLocaleString(),
    //         userSend: user,
    //         userRecieve: props.userCurrentChat
    //     }
    //     props.userCurrentChat.messages.push(msg)
    //     // setMessages([...messages, msg]);
    //     console.log(messages)
    //     // console.log(props.userCurrentChat.messages)
    //     // const message = props.userCurrentChat.messages.concat(msg)
    //     // props.userCurrentChat.messages = message;
    //     // console.log(props.userCurrentChat.messages)
    //     // props.userCurrentChat.messages.map((e) => {
    //     //     console.log(e)
    //     // })
    //     //     setMessages(old => [
    //     //         ...old,
    //     //         msg
    //     //     ])
    //     // }
    //     // console.log("messages >> ", messages)
    // }

    useEffect(() => {
        // console.log("hee");
        // socket.on("private message", async ({ content, from, date, userSend, userRecieve }) => {
        //     const msg = {
        //         content,
        //         from: from,
        //         date: date,
        //         userSend: userSend,
        //         userRecieve: userRecieve
        //     }
        //     console.log(msg)
        //     await props.userCurrentChat.messages?.push(msg);
        //     // setMessages([...messages, msg])
    
        //     console.log("from on prite ", props.userCurrentChat.messages)
    
        // })
        
    }, [])

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
    // const renderMessage = () => {
    //     const listChat = [];
    //     messages.map((me) => {
    //         listChat.push(
    //             <>
    //                 <div
    //                     key={me.content}
    //                     style={me.from != socket.id ? chatFromFriend : chatFromSelf}>
    //                     <Avatar style={me.from != socket.id ? { float: "left" } : { float: "right" }} src={me.photoURL} /> <br />
    //                     <Space
    //                         direction="vertical"
    //                         style={{
    //                             maxWidthwidth: '70%',
    //                         }}
    //                     >
    //                         <Alert
    //                             message={me.content}
    //                             description="me.date"
    //                             type={me.from == socket.id ? "success" : "info"}
    //                         />
    //                     </Space>
    //                 </div>
    //             </>

    //         )
    //     })

    //     return listChat;
    // }

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
                        {/* <List
                            dataSource={currentUser}
                            renderItem={(item) => (
                                <List.Item key={item.email} >
                                    <List.Item.Meta
                                        style={{ display: "flex", alignItems: "center", cursor: "pointer",}}
                                        avatar={<Avatar src={item.photoURL} />}
                                        title={<a href="#">{item.username}</a>}
                                        description={"Online"}
                                    />
                                </List.Item>
                            )}

                            
                        /> */}

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
                        padding: '0 50px',
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
                            padding: '0 16px',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={props.userCurrentChat.messages || 0}
                            hasMore={props.userCurrentChat.messages < 50}
                            scrollableTarget="scrollableDiv"
                            style={{ display: "flex", flexDirection: "column" }}
                        >
                            {
                                props.userCurrentChat.messages?.map((me) => {
                                    return (
                                        <div
                                            key={me.date}
                                            style={me.from != socket.id ? chatFromFriend : chatFromSelf}>
                                            <Avatar style={me.from != socket.id ? { float: "left" } : { float: "right" }} src={me.userSend.photoURL} /> <br />
                                            <Space
                                                direction="vertical"
                                                style={{
                                                    maxWidthwidth: '70%',
                                                }}
                                            >
                                                <Alert
                                                    message={me.content}
                                                    description={me.date}
                                                    type={me.from == socket.id ? "success" : "info"}
                                                />
                                            </Space>
                                        </div>
                                    )

                                })
                            }
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
                        justifyContent: "space-between"
                    }}
                >
                    <Input onChange={(e) => setTextMessage(e.target.value)} value={textMessage} size="large" placeholder="Nhập tin nhắn..." />
                    <Button onClick={() => { props.sendMessage(textMessage); setTextMessage(''); }} icon={<SendOutlined />}></Button>
                </Footer>
            </Layout>
        </>
    )
}
// class HistoryChat extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             data: [{
//                 email: "abc@gmail",
//                 image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
//                 title: "abcsdf",
//                 hasNewMessage: false
//             }],
//             messages: [
//                 {
//                     fromSelf: true,
//                     content: "abcdf",
//                     date: "11:30am"
//                 },
//                 {
//                     fromSelf: false,
//                     content: "abcdsdgsdgdgdgf",
//                     date: "11:30am"
//                 },
//                 {
//                     fromSelf: false,
//                     content: "abcdsdgsdgdgdgf",
//                     date: "11:30am"
//                 },
//                 {
//                     fromSelf: false,
//                     content: "abcdsdgsdgdgdgf",
//                     date: "11:30am"
//                 },
//                 {
//                     fromSelf: false,
//                     content: "abcdsdgsdgdgdgf",
//                     date: "11:30am"
//                 }
//             ]
//         }
//     }

//     render() {
//         const listChat = [];
//         const chatFromFriend = {
//             alignSelf: "flex-start",
//             marginBottom: "10px"
//         }
//         const chatFromSelf = {
//             alignSelf: "flex-end",
//             marginBottom: "10px",
//         }

//         this.state.messages.map((me) => {
//             listChat.push(
//                 <>
//                     <div
//                         style={me.fromSelf ? chatFromFriend : chatFromSelf}>
//                         <Avatar style={me.fromSelf ? { float: "left" } : { float: "right" }} src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} /> <br />
//                         <Space
//                             direction="vertical"
//                             style={{
//                                 maxWidthwidth: '70%',
//                             }}
//                         >
//                             <Alert
//                                 message={me.content}
//                                 description={me.date}
//                                 type={me.fromSelf ? "success" : "info"}
//                             />
//                         </Space>
//                     </div>
//                 </>

//             )
//         })
//         return (
//             <>
//                 <Layout style={{ height: "100vh", background: "" }}>
//                     <Header
//                         style={{
//                             position: 'sticky',
//                             top: 0,
//                             zIndex: 1,
//                             width: '100%',
//                             backgroundColor: "#fff",
//                             borderLeft: "thin solid #d9d9d9",
//                             borderBottom: "thin solid #d9d9d9",
//                             height: "10%",
//                             display: "flex",
//                             alignItems: "center",
//                             display: "flex",
//                         }}
//                     >

//                         <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
//                             <List
//                                 dataSource={this.state.data}
//                                 renderItem={(item) => (
//                                     <List.Item key={item.email} >
//                                         <List.Item.Meta
//                                             style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
//                                             avatar={<Avatar src={item.image} />}
//                                             title={<a href="#">{item.title}</a>}
//                                             description={"Online"}
//                                         />
//                                         <div>
//                                             <Badge dot={item.hasNewMessage}></Badge>
//                                         </div>
//                                     </List.Item>
//                                 )}
//                             />

//                             <div >
//                                 <Button style={{ marginRight: "15px" }} icon={<PhoneOutlined />}></Button>
//                                 <Button icon={<VideoCameraOutlined />}></Button>
//                             </div>

//                         </div>
//                     </Header>
//                     <Content
//                         className="site-layout"
//                         style={{
//                             padding: '0 50px',
//                             borderLeft: "thin solid #d9d9d9",
//                             backgroundColor: "#fff",
//                             overflow: "hidden"
//                         }}
//                     >
//                         <div id="scrollableDiv"
//                             style={{
//                                 marginTop: "20px",
//                                 height: "95%",
//                                 overflow: 'auto',
//                                 padding: '0 16px',
//                             }}
//                         >
//                             <InfiniteScroll
//                                 dataLength={this.state.data.length}
//                                 hasMore={this.state.data.length < 50}
//                                 scrollableTarget="scrollableDiv"
//                                 style={{ display: "flex", flexDirection: "column" }}
//                             >

//                                 {listChat}
//                             </InfiniteScroll>
//                         </div>
//                         {/* </div> */}
//                     </Content>
//                     <Footer
//                         style={{
//                             textAlign: 'center',
//                             borderLeft: "thin solid #d9d9d9",
//                             borderTop: "thin solid #d9d9d9",
//                             height: "15%",
//                             padding: '0 50px',
//                             backgroundColor: "#fff",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "space-between"
//                         }}
//                     >
//                         <Input size="large" placeholder="Nhập tin nhắn..." />
//                         <Button icon={<SendOutlined />}></Button>
//                     </Footer>
//                 </Layout>
//             </>
//         )
//     }
// }

export default HistoryChat