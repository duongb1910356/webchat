import React from "react";
import { Breadcrumb, Layout, Menu, theme, Avatar, List, Badge, Button } from 'antd';
import { PhoneOutlined, VideoCameraOutlined, SendOutlined } from '@ant-design/icons';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Alert, Space, Input } from 'antd';

const { Header, Content, Footer } = Layout;
const { Search } = Input;

class HistoryChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                email: "abc@gmail",
                image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                title: "abcsdf",
                hasNewMessage: false
            }],
            messages: [
                {
                    fromSelf: true,
                    content: "abcdf",
                    date: "11:30am"
                },
                {
                    fromSelf: false,
                    content: "abcdsdgsdgdgdgf",
                    date: "11:30am"
                },
                {
                    fromSelf: false,
                    content: "abcdsdgsdgdgdgf",
                    date: "11:30am"
                },
                {
                    fromSelf: false,
                    content: "abcdsdgsdgdgdgf",
                    date: "11:30am"
                },
                {
                    fromSelf: false,
                    content: "abcdsdgsdgdgdgf",
                    date: "11:30am"
                }
            ]
        }
    }

    render() {
        const listChat = [];
        const chatFromFriend = {
            alignSelf: "flex-start",
            marginBottom: "10px"
        }
        const chatFromSelf = {
            alignSelf: "flex-end",
            marginBottom: "10px",
        }

        this.state.messages.map((me) => {
            listChat.push(
                <>
                    <div
                        style={me.fromSelf ? chatFromFriend : chatFromSelf}>
                        <Avatar style={me.fromSelf ? { float: "left" } : { float: "right" }} src={"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"} /> <br />
                        <Space
                            direction="vertical"
                            style={{
                                maxWidthwidth: '70%',
                            }}
                        >
                            <Alert
                                message={me.content}
                                description={me.date}
                                type={me.fromSelf ? "success" : "info"}
                            />
                        </Space>
                    </div>
                </>

            )
        })
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
                            <List
                                dataSource={this.state.data}
                                renderItem={(item) => (
                                    <List.Item key={item.email} >
                                        <List.Item.Meta
                                            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
                                            avatar={<Avatar src={item.image} />}
                                            title={<a href="#">{item.title}</a>}
                                            description={"Online"}
                                        />
                                        <div>
                                            <Badge dot={item.hasNewMessage}></Badge>
                                        </div>
                                    </List.Item>
                                )}
                            />

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
                                dataLength={this.state.data.length}
                                hasMore={this.state.data.length < 50}
                                scrollableTarget="scrollableDiv"
                                style={{ display: "flex", flexDirection: "column" }}
                            >

                                {listChat}
                            </InfiniteScroll>
                        </div>
                        {/* </div> */}
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
                        <Input size="large" placeholder="Nhập tin nhắn..." />
                        <Button icon={<SendOutlined />}></Button>
                    </Footer>
                </Layout>
            </>
        )
    }
}

export default HistoryChat