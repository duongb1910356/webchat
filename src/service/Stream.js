export function openStream() {
    const config = { audio: false, video: true };
    return navigator.mediaDevices.getUserMedia(config);
}

export function playStream(idVideoTag, stream) {
    const video = document.getElementById(idVideoTag);
    video.srcObject = stream;
    video.play();
}

export function stopStream(stream) {
    stream.getTracks().forEach(function (track) {
        track.stop();
    });
}