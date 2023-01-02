import React from "react";
import { Col, Row } from 'antd';
import Sidebar from "../components/Sidebar";

class Chat extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
                <Row>
                    <Col span={2} style={{border: "1px solid"}}>
                        <Sidebar />
                    </Col>
                    <Col span={5} style={{border: "1px solid"}}>
                        
                    </Col>
                    <Col span={17} style={{border: "1px solid"}}>
                        
                    </Col>
                </Row>
            </>
        )
    }
}

export default Chat