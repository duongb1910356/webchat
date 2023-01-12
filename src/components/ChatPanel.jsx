import React, { useState } from "react";
import { WechatOutlined, MessageOutlined, UserOutlined, PlusOutlined, UsergroupAddOutlined, UserAddOutlined } from '@ant-design/icons';
import { Form, Input, Button, Tooltip, Space, Avatar, Image, List, Skeleton, Divider, Badge, Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import socket from "../socket";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { useEffect } from "react";

const { Search } = Input;

export default function ChatPanel(props) {
    const [isModalOpenInviteFriend, setIsModalOpenInviteFriend] = useState(false);
    const { user } = useContext(UserContext);

    const showModalInviteFriend = () => {
        setIsModalOpenInviteFriend(true);
    }

    const handleCancel = () => {
        setIsModalOpenInviteFriend(false)
    }
    const onFinish = (values) => {
        // console.log(values)
        socket.emit('send invite', values);
    };

    const sendTestUpdateFriend = () => {
        socket.emit('want update friend')
    }

    useEffect(() => {
        console.log("from chatpanel: ",props.friends)
        // socket.on("updateListFriend", () => {
        //     console.log("update friend: ",socket.id)

        // });

        // return () => {
        //     socket.removeAllListeners()
        // }
    }, [props.friends])


    const container = {
        background: {
            height: "100vh",
            padding: "10px 20px",
            boxSizing: "border-box",
            mozBoxSizing: "border-box",
            webkitBoxSizing: "border-box",
            display: "flex",
            flexDirection: "column"
        },

        headerChatPanel: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }
    }
    return (
        <>
            <Modal title={"Thêm bạn"} onOk={onFinish} onCancel={handleCancel} open={isModalOpenInviteFriend} okText={"Mời"} cancelText={"Huỷ"} >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập email muốn kết bạn',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    {/* <Form.Item
                        label="Lời nhắn"
                        name="inviteMessage"
                        rules={[
                            {
                                required: true,
                                message: 'Nhập lời nhắn',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item> */}


                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>

            <div style={container.background}>
                <div style={container.headerChatPanel}>
                    <h1>Chat</h1>
                    <div>
                        <Tooltip title="Thêm bạn">
                            <Button onClick={showModalInviteFriend} style={{ margin: "0px 10px" }} icon={<PlusOutlined />} />
                        </Tooltip>
                        <Tooltip title="Thêm nhóm">
                            <Button style={{ margin: "0px 10px" }} icon={<UsergroupAddOutlined />} />
                        </Tooltip>
                    </div>
                </div>
                <div style={{ overflow: "hidden", height: "100vh" }}>
                    <div>
                        <Search placeholder="Nhập tên cần tìm" style={{ width: "100%" }} />
                    </div>
                    <div id="scrollableDiv"
                        style={{
                            marginTop: "20px",
                            height: "90%",
                            overflow: 'auto',
                            padding: '0 16px',
                            border: '1px solid rgba(140, 140, 140, 0.35)',
                        }}
                    >
                        <InfiniteScroll
                            dataLength={props.friends.length}
                            // next={loadMoreData}
                            hasMore={props.friends.length < 50}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                dataSource={props.friends[0]}
                                renderItem={(item) => (
                                    <List.Item key={item.email}  onClick={() => {
                                        alert(item.email)
                                    }}>
                                        <List.Item.Meta
                                            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                            avatar={<Avatar src={item.photoURL} />}
                                            title={<a href="#">{item.username}</a>}
                                            description={item.email}
                                        />
                                        <div>
                                            <Badge dot={true}></Badge>
                                        </div>
                                    </List.Item>
                                )}
                            />
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
        </>
    )
}
// class ChatPanel extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             friendCount: 0,
//             isModalOpenInviteFriend: false
//         }
//         this.showModalInviteFriend = this.showModalInviteFriend.bind(this)
//         this.handleCancel = this.handleCancel.bind(this)
//     }

//     showModalInviteFriend() {
//         this.setState({ isModalOpenInviteFriend: true });
//     }

//     handleCancel() {
//         this.setState({ isModalOpenInviteFriend: false })
//     }

//     render() {
//         const container = {
//             background: {
//                 height: "100vh",
//                 padding: "10px 20px",
//                 boxSizing: "border-box",
//                 mozBoxSizing: "border-box",
//                 webkitBoxSizing: "border-box",
//                 display: "flex",
//                 flexDirection: "column"
//             },

//             headerChatPanel: {
//                 display: "flex",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between"
//             }
//         }

//         const onFinish = (values) => {
//             socket.emit('invite', values)
//         };
//         const onFinishFailed = (errorInfo) => {
//             console.log('Failed:', errorInfo);
//         };

//         return (
//             <>
//             </>
//         )
//     }
// }

// export default ChatPanel;