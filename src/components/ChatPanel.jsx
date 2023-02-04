import React, { useState, useRef, useContext } from "react";
import { WechatOutlined, MessageOutlined, UserOutlined, PlusOutlined, UsergroupAddOutlined, UserAddOutlined, UploadOutlined } from '@ant-design/icons';
import { Form, Input, Button, Tooltip, Space, Avatar, Image, List, Skeleton, Divider, Badge, Modal, Checkbox, Col, Row, Upload } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import socket from "../socket";
import UserContext from "../contexts/UserContext";
import { useEffect } from "react";
import Auth from "../service/Auth";
import FriendContext from "../contexts/FriendContext";
import phoneGif from "../asset/iconphonerang.gif";
import { getStorage, ref, getDownloadURL, uploadBytes } from "firebase/storage";
const storage = getStorage();

const { Search } = Input;

export default function ChatPanel(props) {
    const { friends, setFriends } = useContext(FriendContext);
    const [friendAddGroup, setFriendAddGroup] = useState([])
    const submitBtnFormInvite = useRef(null);
    const [isModalOpenInviteFriend, setIsModalOpenInviteFriend] = useState(false);
    const { user } = useContext(UserContext);
    const [groupName, setGroupName] = useState([]);
    const [currentFriends, setCurrentFriend] = useState([]);
    const [isModalOpenGroupFriend, setIsModalOpenGroupFriend] = useState(false);
    const [checked, setChecked] = useState([]);
    const [photoURL, setPhotoURL] = useState('http://abc.xyz');
    const [loadingBtn, setLoadingBtn] = useState(false);
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
    };

    const getListFriend = async () => {
        if (user.uid) {
            const listfriend = await (await Auth.getListFriend(user.uid)).data[0];
            setFriendAddGroup(listfriend);
            const listgroup = await (await Auth.getListGroup(user.uid)).data.depend;
            const result = [...listfriend, ...listgroup]
            // console.log("list f >>>>> ", listfriend);
            // console.log("list g >>>>> ", listgroup);
            // console.log("type of listgroup >>>>> ", temp)
            if (result) {
                result.map(e => {
                    return (
                        e.hasNewMessage = false,
                        e.hasNewVideoCall = false,
                        e.messages = []
                    )
                })
                setTimeout(() => {
                    setFriends(result);
                }, 300);
            }
            console.log("list r >>>>> ", result);


        }
    };
    

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

    const submitCreateGroup = () => {
        setLoadingBtn(true);
        const data = {
            uid: user.uid,
            groupname: groupName,
            photoURL: photoURL,
            checked: checked
        }

        Auth.createGroup(data)
            .then((resolve) => {
                setLoadingBtn(false);
                alert("Nhóm đã tạo thành công");
                setIsModalOpenGroupFriend(false);
            })
            .catch(reject => {
                setLoadingBtn(false);
                alert("Lỗi tạo nhóm");
            })
    }

    useEffect(() => {
        console.log("checked >> ", checked);
        console.log("group name >> ", groupName);
        console.log("group name >> ", groupName);
    }, [checked, groupName, photoURL]);

    const uploadImageOnly = {
        showUploadList: true,
        beforeUpload: async (file) => {
            // setPhotoURL('http://abc.xyz');
            setLoadingBtn(true)
            const imgRef = ref(storage, user.uid + "group?" + file.name);
            uploadBytes(imgRef, file)
                .then(() => {
                    getDownloadURL(imgRef)
                        .then((url) => {
                            console.log("URL ", url);
                            setPhotoURL(url);
                            setLoadingBtn(false);
                        })
                        .catch((error) => {
                            console.log("Error get url img send ", error)
                        })
                })
                .catch((er) => {
                    console.log("Error upload img sending ", er)
                })
            // console.log("file name ", file.name)
            return false;
        },
    };

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


            <Modal width={400} title={"Thêm nhóm"} open={isModalOpenGroupFriend}
                footer={[
                    <Button key={"cancel"} onClick={() => setIsModalOpenGroupFriend(false)}>
                        Huỷ
                    </Button>,
                    <Button key={"ok"} onClick={submitCreateGroup} loading={loadingBtn}>
                        Tạo
                    </Button>
                ]}
            >
                <Input onChange={(e) => setGroupName(e.target.value)} placeholder="Nhập tên nhóm" />
                <hr />
                <Upload accept=".png, .jpg" {...uploadImageOnly}>
                    <Button icon={<UploadOutlined />}>Chọn ảnh đại diện</Button>
                </Upload>
                <Checkbox.Group
                    style={{ display: "inline-block", width: "100%" }}
                    value={checked}
                    onChange={(checkedValues) => {
                        setChecked(checkedValues);
                    }}
                >
                    <List
                        itemLayout="vertical"
                        dataSource={friendAddGroup}
                        renderItem={(item) => (
                            <List.Item key={item.email ?? item.id}
                                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                            >
                                <List.Item.Meta
                                    style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                    avatar={<Avatar src={item.photoURL} />}
                                    title={<a href="#">{item.username ?? item.groupname}</a>}
                                />
                                <span>{<Checkbox value={item.uid} />}</span>
                            </List.Item>
                        )}
                    />
                </Checkbox.Group>
            </Modal>

            <div style={container.background}>
                <div style={container.headerChatPanel}>
                    <h1>Chat</h1>
                    <div>
                        <Tooltip title="Thêm bạn">
                            <Button onClick={showModalInviteFriend} style={{ margin: "0px 10px" }} icon={<PlusOutlined />} />
                        </Tooltip>
                        <Tooltip title="Thêm nhóm">
                            <Button onClick={() => setIsModalOpenGroupFriend(true)} style={{ margin: "0px 10px" }} icon={<UsergroupAddOutlined />} />
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
                                dataSource={friends}
                                renderItem={(item) => (
                                    <List.Item key={item.email ?? item.id} onClick={() => {
                                        props.selectFriend(item)
                                    }}>
                                        <List.Item.Meta
                                            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                            avatar={<Avatar src={item.photoURL} />}
                                            title={<a href="#">{item.username ?? item.groupname}</a>}
                                            description={item.email ?? item.num + " thành viên"}
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