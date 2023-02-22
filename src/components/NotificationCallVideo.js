import React, { useState } from 'react';
import { Modal, Avatar, Button } from 'antd';

const CallNotificationCallVideo = ({ incommingCall, visible, onAccept, onDecline }) => {
    return (
        <Modal
            visible={visible}
            title="Incoming Call"
            onCancel={onDecline}
            footer={null}
            maskClosable={false}
            closable={false}
            centered
        >
            <div className="call-notification" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                <Avatar src={incommingCall?.metadata.userCall.photoURL}  size={64} style={{ backgroundColor: '#87d068' }}>
                    {/* {caller && caller.charAt(0)} */}
                </Avatar>
                <h3 style={{ marginTop: '10px' }}> is calling...</h3>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <Button onClick={onAccept} className="accept-call-btn">
                        Accept
                    </Button>
                    <Button onClick={onDecline} className="decline-call-btn">
                        Decline
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default CallNotificationCallVideo;