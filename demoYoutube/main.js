//------------------------------------------------------------------------------
import {
  publicToken,
  mainSceneUUID,
  youtubeVideo
} from "./config.js";

//------------------------------------------------------------------------------
window.addEventListener("load", InitApp);
window.labels = {};

//------------------------------------------------------------------------------
async function InitApp() {
  await SDK3DVerse.joinOrStartSession({
    userToken: publicToken,
    sceneUUID: mainSceneUUID,
    canvas: document.getElementById("display-canvas"),
    createDefaultCamera: true,
    startSimulation: "on-assets-loaded",
    defaultControllerType: SDK3DVerse.controller_type.editor,
  });

  await SDK3DVerse.installExtension(SDK3DVerse_ViewportDomOverlay_Ext);
  const labelExt = await SDK3DVerse.installExtension(SDK3DVerse_LabelDisplay_Ext);

  labelExt.onLabelListUpdated = (labelEntities) => {
    labelEntities.forEach(e => labels[e.getName()] = e);
  };
}

let player;
window.onYouTubePlayerAPIReady = function() {
  if (document.getElementById("player")) {
    document.getElementById("player_container").removeChild(document.getElementById("player"));
  }
  var div=document.createElement("div");
  div.id="player";
  document.getElementById("player_container").appendChild(div);
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId:youtubeVideo.id,
    events: {
    'onReady': onPlayerReady,
    'onStateChange': onPlayerStateChange
    }
  });
}


// autoplay video
function onPlayerReady(event) {
  event.target.playVideo();
}

let intervalTimerId = null;
function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    intervalTimerId = setInterval(checkPlayerCurrentTime, 1000);
  }
  else {
    clearInterval(intervalTimerId);
    intervalTimerId = null;
    currentLabel = null;
  }
}

let currentLabel = null;
function checkPlayerCurrentTime() {
  const currentTime = player.getCurrentTime();

  const minTimeInsec = Object.keys(youtubeVideo.timeInSecToLabelName);

  let t;
  for(t of minTimeInsec) {
    if(currentTime < t) {
      break;
    }
  }

  const labelName = youtubeVideo.timeInSecToLabelName[t];
  if(currentLabel !== labels[labelName])
  {
    currentLabel = labels[labelName];
    SDK3DVerse.extensions.LabelDisplay.onLabelClicked(currentLabel);
  }
}