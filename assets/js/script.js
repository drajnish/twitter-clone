"use strict";

const postedMedia = document.querySelectorAll(".posted-media");

// console.log(postedMedia);

postedMedia.forEach((parent) => {
  const nextSibling = parent.nextElementSibling;
  // const postImage = parent.querySelector(".posted-image");

  if (nextSibling) {
    if (nextSibling.classList.contains("post-about")) {
      // console.log(nextSibling);
      parent.style.borderTopLeftRadius = "1rem";
      parent.style.borderTopRightRadius = "1rem";
    }
  } else {
    // console.log(postImage);
    // postImage.style.borderRadius = "1rem";
    parent.style.borderRadius = "1rem";
  }
});

// video player setting

/* Get our elements */
const player = document.querySelector(".player");
const video = document.querySelector(".viewer");
const progress = document.querySelector(".progress");
const progressBar = document.querySelector(".progress__filled");
const toggle = document.querySelector(".toggle");
const playButton = document.querySelector(".play-icon");
const pauseButton = document.querySelector(".pause-icon");
const mute = document.querySelector(".mute");
const fullScreen = document.querySelector(".full__screen");

/* Build out functions */
function togglePlay() {
  const method = video.paused ? "play" : "pause";
  // console.log(video);
  video[method]();
  /*
  //or we can do
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  } 
  */
}

function updateButton() {
  const icon = this.paused ? playButton : pauseButton;

  if (icon === playButton) {
    pauseButton.style.display = "none";
    playButton.style.display = "inline-block";
  } else {
    playButton.style.display = "none";
    pauseButton.style.display = "inline-block";
  }
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  //   console.log(percent);
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
  //   console.log(e);
}

function handleFullscreen() {
  const isInFullScreen =
    (document.fullscreenElement && document.fullscreenElement !== null) ||
    (document.webkitFullscreenElement &&
      document.webkitFullscreenElement !== null) ||
    (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
    (document.msFullscreenElement && document.msFullscreenElement !== null);

  console.log(isInFullScreen);

  if (!isInFullScreen) {
    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) {
      /* Safari */
      player.webkitRequestFullscreen();
    } else if (player.mozRequestFullScreen) {
      /* firefox */
      player.mozRequestFullScreen();
    } else if (player.msRequestFullscreen) {
      /* IE11 */
      player.msRequestFullscreen();
    }
  } else {
    console.log("fullscreen");
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (player.webkitExitFullscreen) {
      player.webkitExitFullscreen();
    } else if (player.mozCancelFullScreen) {
      player.mozCancelFullScreen();
    } else if (player.msExitFullscreen) {
      player.msExitFullscreen();
    }
  }
}

function handelSound() {
  console.log(video.muted);
  if (video.muted === true) {
    video.muted = false;
    // console.log(video.muted);
  } else {
    video.muted = true;
    // console.log(video.muted);
  }
}

/* Hook up the event listners */
video.addEventListener("click", togglePlay);
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);
video.addEventListener("timeupdate", handleProgress);

mute.addEventListener("click", handelSound);
toggle.addEventListener("click", togglePlay);
// skipButtons.forEach((button) => button.addEventListener("click", skip));
// ranges.forEach((range) => range.addEventListener("change", handleRangeUpdate));
// ranges.forEach((range) =>
//   range.addEventListener("mousemove", handleRangeUpdate)
// );

let mousedown = false;
progress.addEventListener("click", scrub);
progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));

fullScreen.addEventListener("click", handleFullscreen);
