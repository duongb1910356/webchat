import React from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import socket from '../socket';
const { Meta } = Card;

export default function AddFriend(props) {
    const [listCard, setListCard] = useState([]);

    const container = {
        height: "100vh",
        boxSizing: "border-box",
        mozBoxSizing: "border-box",
        webkitBoxSizing: "border-box",
        borderLeft: "thin solid #d9d9d9",
        padding: "25px 15px",
        with: "100%"
    }
    const datatest = [
        {
            "socketid": "123",
            "username": "avc sdsgdgs sgd ",
            "photoURL": "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
            "messege": "Muốn kết bạn với bạn"
        }
    ]

    const agreeMakeFriend = (uid, id) => {
        // alert(id);
        socket.emit("agreeMakeFriend", {
            toUid: uid,
            toIdSocket: id
        })
    }

    useEffect(() => {
        console.log(">>>>>>>>>: ", props.users);
        if (props.users) {
            console.log("props.users");

            props.users.map((el) => {
                const temp =
                    <Card
                        style={{
                            width: 300,
                        }}
                        actions={[
                            <DeleteOutlined key="delete" onClick={() => { alert("ell") }} />,
                            <CheckOutlined key="accept" onClick={() => agreeMakeFriend(el.uid, el.id)}/>,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={el.photoURL} />}
                            title={el.username}
                            description={"Muốn kết bạn với bạn"}
                        />
                    </Card>

                setListCard(preveState => [...listCard, temp])
                // listCard.push(
                //     <Card
                //         style={{
                //             width: 300,
                //         }}
                //         actions={[
                //             <DeleteOutlined key="delete" onClick={() => { alert("ell") }} />,
                //             <CheckOutlined key="accept" />,
                //         ]}
                //     >
                //         <Meta
                //             avatar={<Avatar src={el.photoURL} />}
                //             title={el.username}
                //             description={el.messege}
                //         />
                //     </Card>
                // )
            })
        }

    }, [props.users])

    return (

        <>
            <div style={container}>
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    flexWrap: "wrap",
                    width: "100%"
                }}>
                    <p>{props.test}</p>

                    {listCard}
                    {/* <Card
                        style={{
                            width: 300,
                        }}
                        actions={[
                            <DeleteOutlined key="delete" onClick={() => {alert("ell")}} />,
                            <CheckOutlined key="accept" />,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                            title="Trần Quốc Dương"
                            description="Muốn kết bạn với bạn"
                        />
                    </Card> */}

                </div>

            </div>
        </>
    )
}