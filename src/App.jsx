import { useState } from "react";
import Fire from "./components/Fire";
import Torch from "./components/Torch";
import runBackgroundEffects from "./utilities/runBackgroundEffects";
import "./styles.css";

export default function App() {
  const [torchEquipped, setTorchEquipped] = useState(false);
  const [woodKindling, setWoodKindling] = useState(false);
  const [woodOnFire, setWoodOnFire] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });

  runBackgroundEffects(
    torchEquipped,
    woodOnFire,
    setWoodKindling,
    setWoodOnFire,
    setCursorPosition
  );

  const handleMouseDown = () => {
    setTorchEquipped(true);
  };

  const handleMouseUp = () => {
    setTorchEquipped(false);
    setCursorPosition({ x: null, y: null });
  };

  const handleMouseMove = (e) => {
    if (torchEquipped) {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleWoodHover = () => {
    if (torchEquipped) {
      setWoodKindling(true);
    }
  };

  const handleWoodLeave = () => {
    if (torchEquipped) {
      setWoodKindling(false);
      setWoodOnFire(false);
    }
  };

  const handleWoodClick = () => {
    if (torchEquipped && woodKindling) {
      setWoodOnFire(true);
    }
  };

  const torchStyle = {
    position: "absolute",
    left: cursorPosition.x - 10,
    top: cursorPosition.y - 60,
  };

  return (
    <div className={`wrapper ${torchEquipped && "relative no-cursor"}`}>
      <div
        className={`game-area ${!torchEquipped && "relative"}`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        <div
          className={`torch-container ${torchEquipped && "torch-equipped"}`}
          style={torchEquipped ? torchStyle : null}
        >
          <Torch />
        </div>

        <div
          className={`wood-container ${woodKindling && "kindle"}`}
          onMouseEnter={handleWoodHover}
          onMouseLeave={handleWoodLeave}
          onClick={handleWoodClick}
        >
          🪵
          <Fire woodOnFire={woodOnFire} />
        </div>
      </div>
    </div>
  );
}
