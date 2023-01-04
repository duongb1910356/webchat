import React from "react";
import { WechatOutlined, MessageOutlined, UserOutlined, PlusOutlined, UsergroupAddOutlined, UserAddOutlined } from '@ant-design/icons';
import { Form, Input, Button, Tooltip, Space, Avatar, Image, List, Skeleton, Divider, Badge, Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';

const { Search } = Input;
class ChatPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            friendCount: 0,
            isModalOpenInviteFriend: false
        }
        this.showModalInviteFriend = this.showModalInviteFriend.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    showModalInviteFriend() {
        this.setState({ isModalOpenInviteFriend: true });
    }

    handleCancel() {
        this.setState({ isModalOpenInviteFriend: false })
    }

    render() {
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

        const onFinish = (values) => {

            console.log(values);
        };
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };

        return (
            <>
                <Modal title={"Thêm bạn"} onOk={onFinish} onCancel={this.handleCancel} open={this.state.isModalOpenInviteFriend} okText={"Mời"} cancelText={"Huỷ"} >
                    <Form
                        ref={(form) => { this.form = form }}
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
                        onFinishFailed={onFinishFailed}
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

                        <Form.Item
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
                        </Form.Item>


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
                                <Button onClick={this.showModalInviteFriend} style={{ margin: "0px 10px" }} icon={<PlusOutlined />} />
                            </Tooltip>
                            <Tooltip title="Thêm nhóm">
                                <Button style={{ margin: "0px 10px" }} icon={<UsergroupAddOutlined />} />
                            </Tooltip>
                        </div>
                    </div>
                    <div style={{ overflow: "hidden" }}>
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
                                dataLength={this.props.data.length}
                                // next={loadMoreData}
                                hasMore={this.props.data.length < 50}
                                // loader={
                                //     <Skeleton
                                //         avatar
                                //         paragraph={{
                                //             rows: 1,
                                //         }}
                                //         active
                                //     />
                                // }
                                endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                                scrollableTarget="scrollableDiv"
                            >
                                <List
                                    onChange={() => {

                                    }}
                                    dataSource={this.props.data}
                                    renderItem={(item) => (
                                        <List.Item key={item.email} >
                                            <List.Item.Meta
                                                style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                                avatar={<Avatar src={item.image} />}
                                                title={<a href="#">{item.title}</a>}
                                                description={item.email}
                                            />
                                            <div>
                                                <Badge dot={item.hasNewMessage}></Badge>
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
}

export default ChatPanel;