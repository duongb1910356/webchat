import React, {useContext} from 'react';
import { EditOutlined, EllipsisOutlined, SettingOutlined, DeleteOutlined, CheckOutlined } from '@ant-design/icons';
import { Avatar, Card } from 'antd';
import { useEffect } from 'react';
import { useState } from 'react';
import socket from '../socket';
import UserContext from "../contexts/UserContext";

const { Meta } = Card;

export default function AddFriend(props) {
    const [listCard, setListCard] = useState([]);
    const { user, setUser } = useContext(UserContext);
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

    const agreeMakeFriend = (wanter) => {
        // alert(id);
        socket.emit("agreeMakeFriend", {
            wanter,
            self: user,
        })
    }

    useEffect(() => {
        // if (props.users) {
            console.log("props.users");
            setListCard([]);
            props.users.map((el) => {
                const temp =
                    <Card
                        key={el.uid}
                        style={{
                            width: 300,
                        }}
                        actions={[
                            <DeleteOutlined key="delete" onClick={() => { alert("ell") }} />,
                            <CheckOutlined key="accept" onClick={() => agreeMakeFriend(el)}/>,
                        ]}
                    >
                        <Meta
                            avatar={<Avatar src={el.photoURL} />}
                            title={el.username}
                            description={"Muốn kết bạn với bạn"}
                        />
                    </Card>

                setListCard(preveState => [...listCard, temp])
            })
        // }

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
                    {listCard}

                </div>

            </div>
        </>
    )
}