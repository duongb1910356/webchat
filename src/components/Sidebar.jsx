import React, {useState} from "react";
import { WechatOutlined, MessageOutlined, UserOutlined, BellOutlined, ContainerOutlined } from '@ant-design/icons';
import { Button, Tooltip, Space, Avatar, Image, Badge } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useEffect } from "react";
import socket from "../socket";
import { useNavigate, Link } from "react-router-dom"; //import module điều hướng

export default function Sidebar(props){
    // const [show, setShow] = useState(false);

    useEffect(() => {
        // socket.on("require add friend", ({content, from}) => {
        //     console.log("data add friend: >>", content);
        //     // setShow(true);
        // })

        return () => {
            socket.removeAllListeners()
        }
    },[])

    const getItem = (label, key, icon, children, type) => {
        return {
            key,
            icon,
            children,
            label,
            type,
        };
    }

    // const onClickMenu = (e) => {
    //     if(e.key == "noficiation"){
    //         props.show = false
    //     }
    // };

    const items = [
                    getItem('New Friend', 'noficiation',
                        <Badge dot={props.show}>
                            <BellOutlined />
                        </Badge>),
                    getItem('Danh sách', 'list', <ContainerOutlined />, [
                        getItem("Nhóm", "groups"),
                        getItem("Bạn bè", "friends")
                    ]),
                    getItem('Cài đặt', 'setting', <SettingOutlined />, [
                        getItem("User info", "userInfo"),
                        getItem("Đăng xuất", "logout")
                    ])
                ];
    
   
    return (
        <>
            <div style={{boxSizing: "border-box", mozBoxSizing: "border-box", webkitBoxSizing: "border-box", height:"100vh", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "25px", borderRight: "thin solid #d9d9d9", }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "15px" }}>
                        <Avatar size={65} src={props.user.photoURL} />
                    <strong>{props.user.username}</strong>
                </div>
                <Menu
                    onClick={props.onClickMenu}
                    style={{
                        width: "auto",
                        height: "100%",
                        border: "none",
                    }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                    items={items}
                />
            </div>
        </>
    )
}

// class Sidebar extends React.Component {
//     constructor(props) {
//         super(props)
//         // this.state = {
//         //     friendCount: 0
//         // }
//     }

//     getItem(label, key, icon, children, type) {
//         return {
//             key,
//             icon,
//             children,
//             label,
//             type,
//         };
//     }

//     render() {
//         const container = {
//             background: {
//                 // height: "100vh",
//                 // borderRight: "thin solid #d9d9d9",
//                 // display: "flex",
//                 // flexDirection: "column",
//                 // alignItems: "center",
//                 // padding: "25px 0px",
//                 boxSizing: "border-box",
//                 mozBoxSizing: "border-box",
//                 webkitBoxSizing: "border-box",
//                 justifyContent: "space-between"
//             },
//             itemFlex: {
//                 display: "flex",
//                 flexDirection: "column",
//                 alignItems: "center"
//             },
//             itemButton: {
//                 width: "100px",
//                 height: "50px",
//                 backgroundColor: '#ADD5F7',
//                 padding: "10px 0px",
//                 marginBottom: "30px"
//             }

//         }

//         const items = [
//             this.getItem('Thông báo', 'noficiation',
//                 <Badge dot={this.props.show}>
//                     <BellOutlined />
//                 </Badge>),
//             this.getItem('Danh sách', 'list', <ContainerOutlined />, [
//                 this.getItem("Nhóm", "groups"),
//                 this.getItem("Bạn bè", "friends")
//             ]),
//             this.getItem('Cài đặt', 'setting', <SettingOutlined />, [
//                 this.getItem("User info", "userInfo"),
//                 this.getItem("Đăng xuất", "logout")
//             ])
//         ];
//         console.log(this.props.user)

//         return (
//             < >
//                 <div style={{boxSizing: "border-box", mozBoxSizing: "border-box", webkitBoxSizing: "border-box", height:"100vh", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "25px", borderRight: "thin solid #d9d9d9", }}>
//                     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: "15px" }}>
//                         <Avatar size={65} src={this.props.user.photoURL} />
//                         <strong>{this.props.user.username}</strong>
//                     </div>
//                     <Menu
//                         // onClick={onClick}
//                         style={{
//                             width: "auto",
//                             height: "100%",
//                             border: "none",
//                         }}
//                         defaultSelectedKeys={['1']}
//                         defaultOpenKeys={['sub1']}
//                         mode="inline"
//                         items={items}
//                     />
//                 </div>
//                 {/* <div style={container.background}>
//                     <WechatOutlined style={{ color: "blue", fontSize: "50px" }} />
//                     <div style={container.itemFlex}>
//                         <Badge count={0}>
//                             <Button style={container.itemButton} shape="square" icon={<MessageOutlined style={{ fontSize: "25px", color: "white"}} />} />
//                         </Badge>
//                         <Badge count={this.props.friendCount}>
//                             <Button style={container.itemButton} shape="square" icon={<UserOutlined style={{ fontSize: "25px", color: "white"}} />} />
//                         </Badge>
                        
//                     </div>
//                     <div style={container.itemFlex}>
//                         <Avatar size={64} src={<Image src={this.props.user.photoURL} />} />
//                     </div>
//                 </div> */}
//             </>
//         )
//     }
// }
