import React, { useState, useRef, useContext } from "react";
import { WechatOutlined, MessageOutlined, UserOutlined, PlusOutlined, UsergroupAddOutlined, UserAddOutlined } from '@ant-design/icons';
import { Form, Input, Button, Tooltip, Space, Avatar, Image, List, Skeleton, Divider, Badge, Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import socket from "../socket";
import UserContext from "../contexts/UserContext";
import { useEffect } from "react";
import Auth from "../service/Auth";
import FriendContext from "../contexts/FriendContext";
import phoneGif from "../asset/iconphonerang.gif";

const { Search } = Input;

export default function ChatPanel(props) {
    const { friends, setFriends } = useContext(FriendContext);
    const submitBtnFormInvite = useRef(null);
    const [isModalOpenInviteFriend, setIsModalOpenInviteFriend] = useState(false);
    const { user } = useContext(UserContext);
    // const [friends, setFriends] = useState([]);
    const [currentFriends, setCurrentFriend] = useState([]);

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
    const getListFriend = async () => {
        if (user.uid) {
            const result = await Auth.getListFriend(user.uid);

            console.log("result >>>>> ",result)
            if (result) {
                result.data[0].map(e => {
                    return (
                        e.hasNewMessage = false,
                        e.hasNewVideoCall = false,
                        e.messages = []
                    )
                })
                setTimeout(() => {
                    setFriends(result.data);
                }, 300);
            }

        }
    }

    useEffect(() => {
        getListFriend();
    }, [user])


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
            <Modal title={"Thêm bạn"} onOk={() => { submitBtnFormInvite.current.click() }} onCancel={handleCancel} open={isModalOpenInviteFriend} okText={"Mời"} cancelText={"Huỷ"} >
                <Form
                    style={{ display: "flex" }}
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
                        <Input style={{ width: "230%" }} />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button ref={submitBtnFormInvite} style={{ display: "none" }} type="primary" htmlType="submit">
                            Mời
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
                            dataLength={friends.length}
                            // next={loadMoreData}
                            hasMore={friends.length < 50}
                            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                            scrollableTarget="scrollableDiv"
                        >
                            <List
                                dataSource={friends[0]}
                                renderItem={(item) => (
                                    <List.Item key={item.email} onClick={() => {
                                        props.selectFriend(item)
                                    }}>
                                        <List.Item.Meta
                                            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                            avatar={<Avatar src={item.photoURL} />}
                                            title={<a href="#">{item.username}</a>}
                                            description={item.email}
                                        />
                                        <div>
                                            <Badge dot={item.hasNewMessage}>
                                                {item.hasNewVideoCall && <img height={50} src={phoneGif} alt="" />}
                                            </Badge>

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