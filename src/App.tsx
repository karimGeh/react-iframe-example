import { useEffect, useRef, useState } from "react";
import "./App.css";

const GAME_URL = "https://iframe-games-examples.vercel.app/";

function App() {
  const ref = useRef<HTMLIFrameElement>(null);
  const [state, setState] = useState({
    player_info: "",
    player_score: 0,
    player_state: "",
  });
  // console.log("GAME_URL", import.meta.env);

  const onMessage = async (event: MessageEvent) => {
    console.log("==================PARENT==================");
    console.log("Message received from iframe", event.data);
    console.log("current state", state);
    console.log("==========================================");

    if (event.data.messageType !== "request") return;
    const messageId = event.data.messageId || "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const message = {
      messageType: "response",
      messageId,
      type: event.data.type,
      payload: "",
    };

    switch (event.data.type) {
      case "GET_PLAYER_INFO": {
        message.payload = state.player_info;
        break;
      }
      case "GET_PLAYER_STATE":
        message.payload = state.player_state;
        break;
      case "SAVE_PLAYER_STATE":
        setState({ ...state, player_state: event.data.payload });
        message.payload = "success";
        break;
      case "GET_PLAYER_SCORE":
        message.payload = `${state.player_score}`;
        break;
      case "SAVE_PLAYER_SCORE":
        setState({ ...state, player_score: event.data.payload });
        message.payload = "success";
        break;

      default:
        break;
    }

    console.log("==================PARENT==================");
    console.log("Sending message to iframe", message);
    console.log("==========================================");
    ref.current?.contentWindow?.postMessage(message, "*");
  };

  const onChange =
    (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setState({ ...state, [key]: event.target.value });
    };

  useEffect(() => {
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("message", onMessage);
    };
  }, [state]);

  return (
    <div className="wrapper">
      <div className="appWrapper">
        <h3>The app wrapping the game</h3>

        <div className="serverWrapper">
          <h4>here is the data saved in the server</h4>
          <label htmlFor="" style={{ width: "100%" }}>
            player info (player_info in this case is a string):
            <input
              type="text"
              style={{ width: "100%" }}
              value={state.player_info}
              onChange={onChange("player_info")}
            />
          </label>

          <label htmlFor="" style={{ width: "100%" }}>
            score:
            <input
              type="number"
              style={{ width: "100%" }}
              value={state.player_score}
              onChange={onChange("player_score")}
            />
          </label>

          <label htmlFor="" style={{ width: "100%" }}>
            state (state in this case is a string):
            <input
              type="text"
              style={{ width: "100%" }}
              value={state.player_state}
              onChange={onChange("player_state")}
            />
          </label>
        </div>
      </div>

      <div className="gameWrapper">
        <h3>This is the game</h3>
        <iframe ref={ref} src={GAME_URL} />
      </div>
    </div>
  );
}

export default App;
