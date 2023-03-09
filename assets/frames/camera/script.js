
navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  })
    .then((mediaStream) => {
      const video = document.querySelector('video');
      video.srcObject = mediaStream;
      video.onloadedmetadata = () => {
        video.play();
      };
    })
    .catch((err) => {
      // always check for errors at the end.
      if(err.name == "NotAllowedError"){
        document.body.innerHTML = "<h1>Please allow your camera access</h1>";
      }
      console.error(`${err.name}: ${err.message}`);
  });
  function togglePictureInPicture() {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      document.querySelector("video").requestPictureInPicture();
    }
  }
  document.addEventListener("click", function(){
    togglePictureInPicture();
  })