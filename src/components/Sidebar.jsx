import React from "react";
import { WechatOutlined, MessageOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space, Avatar, Image, Badge } from 'antd';

class Sidebar extends React.Component {
    constructor(props) {
        super(props)
        // this.state = {
        //     friendCount: 0
        // }
    }

    render() {
        const container = {
            background: {
                height: "100vh",
                borderRight: "thin solid #d9d9d9",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "25px 0px",
                boxSizing: "border-box",
                mozBoxSizing: "border-box",
                webkitBoxSizing: "border-box",
                justifyContent: "space-between"
            },
            itemFlex: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            },
            itemButton: {
                width: "100px",
                height: "50px",
                backgroundColor: '#ADD5F7',
                padding: "10px 0px",
                marginBottom: "30px"
            }

        }

        return (
            < >
                <div style={container.background}>
                    <WechatOutlined style={{ color: "blue", fontSize: "50px" }} />
                    <div style={container.itemFlex}>
                        <Badge count={0}>
                            <Button style={container.itemButton} shape="square" icon={<MessageOutlined style={{ fontSize: "25px", color: "white"}} />} />
                        </Badge>
                        <Badge count={this.props.friendCount}>
                            <Button style={container.itemButton} shape="square" icon={<UserOutlined style={{ fontSize: "25px", color: "white"}} />} />
                        </Badge>
                        
                    </div>
                    <div style={container.itemFlex}>
                        <Avatar size={64} src={<Image src={this.props.user.photoURL} />} />
                    </div>
                </div>
            </>
        )
    }
}

export default Sidebar;