let MESSAGE_ID_COUNTER = 0;

let promises = {};

async function getPlayerInfo() {
  return new Promise((resolve, reject) => {
    const messageId = MESSAGE_ID_COUNTER++;
    promises[messageId] = { resolve, reject };
    window.parent.postMessage(
      {
        type: "GET_PLAYER_INFO",
        messageId,
        messageType: "request",
        payload: {},
      },
      "*"
    );
  });
}

async function getPlayerState() {
  return new Promise((resolve, reject) => {
    const messageId = MESSAGE_ID_COUNTER++;
    promises[messageId] = { resolve, reject };
    window.parent.postMessage(
      {
        type: "GET_PLAYER_STATE",
        messageId,
        messageType: "request",
        payload: {},
      },
      "*"
    );
  });
}

async function savePlayerState(newState) {
  return new Promise((resolve, reject) => {
    const messageId = MESSAGE_ID_COUNTER++;
    promises[messageId] = { resolve, reject };
    window.parent.postMessage(
      {
        type: "SAVE_PLAYER_STATE",
        messageId,
        messageType: "request",
        payload: newState,
      },
      "*"
    );
  });
}

async function getPlayerScore() {
  return new Promise((resolve, reject) => {
    const messageId = MESSAGE_ID_COUNTER++;
    promises[messageId] = { resolve, reject };
    window.parent.postMessage(
      {
        type: "GET_PLAYER_SCORE",
        messageId,
        messageType: "request",
      },
      "*"
    );
  });
}

async function savePlayerScore(score) {
  return new Promise((resolve, reject) => {
    const messageId = MESSAGE_ID_COUNTER++;
    promises[messageId] = { resolve, reject };
    window.parent.postMessage(
      {
        type: "SAVE_PLAYER_SCORE",
        messageId,
        messageType: "request",
        payload: score,
      },
      "*"
    );
  });
}

window.addEventListener("message", function (event) {
  if (event.data.messageType === "response") {
    const { messageId, payload } = event.data;
    if (promises[messageId]) {
      promises[messageId].resolve(payload);
      delete promises[messageId];
    }
  }
});

var GBLP_CLIENT = {
  player: {
    getPlayerInfo: getPlayerInfo,
  },
  state: {
    getPlayerState: getPlayerState,
    savePlayerState: savePlayerState,
  },
  score: {
    getPlayerScore: getPlayerScore,
    savePlayerScore: savePlayerScore,
  },
};
