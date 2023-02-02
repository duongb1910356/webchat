class StreamRTC{

    constructor(config){
        this.config = config;
        this.streams = null;
    }

    openStream() {
        return navigator.mediaDevices.getUserMedia(this.config);
    }
    
    playStream(idVideoTag, stream) {
        const video = document.getElementById(idVideoTag);
        video.srcObject = stream;
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.then(_ => {
    
            })
                .catch(error => {
                });
        }
    }
    
    stopStream() {
        console.log("stop stream >>> ", this.streams)
        this.streams.getTracks().forEach(function (track) {
            track.stop();
        });
    }
    
    call(id, peer) {
        this.openStream()
            .then(stream => {
                this.playStream('videoCaller', stream);
                this.streams = stream;
                console.log(stream);
                const call = peer.call(id, stream);
                call.on('stream', remoteStream => {
                    this.playStream('videoCallee', remoteStream);
                    this.streams?.push(stream);
                });
                // setTimeout(() => {
                //     this.stopStream(stream)
                //     // call.close();
                // }, 3000)
                return stream;
            })
            .catch(err => {
                console.log("Lỗi call function call", err);
            })
    }

}

export default StreamRTC

