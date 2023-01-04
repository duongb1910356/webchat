import React from "react";
import { Col, Row } from 'antd';
import Sidebar from "../components/Sidebar";
import ChatPanel from "../components/ChatPanel";
import HistoryChat from "../components/HistoryChat";
import UserContext from "../contexts/UserContext"

class Chat extends React.Component {
    static contextType = UserContext;

    constructor(props) {
        super(props)
        this.state = {
            test: "abc",
            data: [
                {
                    email: "abc@gmail",
                    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    title: "abcsdf",
                    hasNewMessage: false
                },
                {
                    email: "abcfdhhf@gmail",
                    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    title: "abcsddfhfhdfhhff",
                    hasNewMessage: false
                },
                {
                    email: "abcfgdhhf@gmail",
                    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    title: "abcsddfhfhdfhhff",
                    hasNewMessage: false
                },
                {
                    email: "abcasddfdhhf@gmail",
                    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    title: "abcsddfhfhdfhhff",
                    hasNewMessage: false
                },
                {
                    email: "ab4356cfdhhf@gmail",
                    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    title: "abcsddfhfhdfhhff",
                    hasNewMessage: false
                },
                {
                    email: "ab4356c346346fdhhf@gmail",
                    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    title: "abcsddfhfhdfhhff",
                    hasNewMessage: false
                },
                {
                    email: "ab4dfg4535356cfdhhf@gmail",
                    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    title: "abcsddfhfhdfhhff",
                    hasNewMessage: false
                },
                {
                    email: "ab435gdgd6cfdhhf@gmail",
                    image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                    title: "abcsddfhfhdfhhff",
                    hasNewMessage: false
                }
            ]
        }
        this.changeData = this.changeData.bind(this)
    }

    changeData() {
        this.setState(
            {
                data: this.state.data.map(el => {
                    el.hasNewMessage = (el.email == "abcfdhhf@gmail")
                    return el;
                })
            }
        )
        // console.log(this.state.data)
    }

    render() {
        const data2 = [
            {
                email: "abcfsetttttttttdhhf@gmail",
                image: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
                title: "duong",
                hasNewMessage: true
            }
        ]
        const {user} = this.context;


        return (
            <>
                <Row>
                    <Col span={2}>
                        <Sidebar user={user} friendCount={1} />
                    </Col>
                    <Col span={5}>
                        {/* <button onClick={this.changeData}>chhh</button> */}

                        {/* <p>{this.state.test}</p> */}
                        <ChatPanel data={this.state.data} />
                    </Col>
                    <Col span={17}>
                        <HistoryChat />
                    </Col>
                </Row>
            </>
        )
    }
}

export default Chat