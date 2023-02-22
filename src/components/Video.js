// import { Modal, Space } from 'antd';

// const VideoCard = ({ src }) => {
//     return (
//         <div style={{ width: '25%', padding: '10px' }}>
//             <video src={src} controls style={{ width: '100%' }} />
//         </div>
//     );
// }

// const VideoList = ({ videos }) => {
//     return (
//         <Space direction='horizontal' wrap style={{ maxWidth: '100%' }}>
//             {videos.map((video) => (
//                 <VideoCard key={video} src={video} />
//             ))}
//         </Space>
//     );
// };

// const VideoModal = ({ videos, visible, onCancel }) => {
//     return (
//         <Modal title="Videos" visible={visible} onCancel={onCancel} footer={null}>
//             <VideoList videos={videos} />
//         </Modal>
//     );
// };

// export default VideoModal;

// import React from "react";
// import { Modal, Row, Col } from "antd";


// const VideoModal = ({ videos, visible, onCancel }) => {

//     return (
//         <Modal visible={visible} onCancel={onCancel} width={800} cancelText={"Huỷ"} okButtonProps={{ style: { display: 'none' } }}>
//             <Row gutter={[16, 16]}>
//                 {videos &&
//                     videos.map((video, index) => {
//                         console.log('STREAM LOCAL video,js ', video);
//                         // const videoTag = document.createElement('video');
//                         // videoTag.srcObject = video;
//                         // videoTag.play();
//                         // videoTag.style.width = '100%';
//                         // videoTag.style.boxSizing = 'border-box';

//                         return (
//                             <Col key={index} sm={videos.length < 3 ? 12 : 8} style={styles.row}>
//                                 <video srcobject={{video}} autoPlay controls={false} style={styles.video} />
//                             </Col>
//                         );
//                     })}
//             </Row>
//         </Modal>
//     );
// };
import { useEffect, useRef } from 'react';
import { Modal, Row, Col } from 'antd';

var styles = {
    row: {
        display: "flex",
        // justifyContent: "flex-start",
        flexWrap: "wrap",
        justifyContent: "center",
        with: "90%"
    },
    video: {
        width: "100%",
        boxSizing: "border-box",
    },
};


function Video({ stream }) {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    }, [stream])

    return <video ref={videoRef} autoPlay style={styles.video} />;
}

function VideoModal({ streams, visible, onCancel }) {
    useEffect(() => {
        console.log("STREAM VIDEO MODAL THAY DOI ", streams)
    },[streams])
    return (
        <Modal
            visible={visible}
            onCancel={onCancel}
            width={900}
            cancelText={"Huỷ"}
            okButtonProps={{ style: { display: 'none' } }}

        >
            <Row gutter={[16, 16]}>
                {streams.map((stream, index) => {
                    return (
                        <Col key={stream.id} span={streams.length < 3 ? 12 : 8} style={styles.row}>
                            <Video key={index} stream={stream} />
                        </Col>
                    );
                })}
            </Row>
        </Modal>
    );
}


export default VideoModal;


