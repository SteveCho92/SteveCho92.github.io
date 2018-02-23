//gets the user media and requests for webcam and audio permission to be true
//function stream --> if the user has approved it will give you the stream of vid and audio
//this wraps the whole peer to peer connection code since it is only required if the user approves the stream
navigator.webkitGetUserMedia({video: true, audio: true}, function(stream) {

//import simple-peer
var Peer = require('simple-peer');
//constructs peer with first initiator having to ask for #init
var peer = new Peer({
    initiator: location.hash =='#init',
    trickle: false,
    //pass peer object the stream so we can stream it out
    stream: stream
    
}); 

//connects to the peer using your session ID
peer.on('signal', function (data) {
    document.getElementById('yourId').value = JSON.stringify(data)
    
})

    //
document.getElementById('connect').addEventListener('click', function () {
    var otherId = JSON.parse(document.getElementById('otherId').value)
    peer.signal(otherId)
})

//when clicked on button send, it sends the text in the yourMessage textarea 
document.getElementById('send').addEventListener('click', function() {
    var yourMessage = document.getElementById('yourMessage').value
    peer.send(yourMessage)
})

peer.on('data', function(data) {
    document.getElementById('messages').textContent += data + '\n'    
})

    //when you get the other users' stream, add a video tag and append to body
peer.on('stream', function(stream) {
    var video = document.createElement('video')
    document.body.appendChild(video)
    //gets video stream src from other user
    video.src = window.URL.createObjectURL(stream)
    //allows video to play by default
    video.play()
    
})    
    //error from stream if the user did not approve the web came or audio
}, function(err) {
    console.error(err)
})