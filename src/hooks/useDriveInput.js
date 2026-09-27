import { useEffect, useRef } from "react";

const KEY_MAP = {
  ArrowUp: "forward",
  KeyW: "forward",
  ArrowDown: "back",
  KeyS: "back",
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
};

/**
 * One shared instance lives in Scene3D, outside the <Canvas>. Its
 * `inputRef` is read every animation frame by the R3F Vehicle; its
 * setters are called by the on-screen touch joystick. A plain ref
 * (not React state) is used deliberately — input changes shouldn't
 * trigger a re-render, only the render loop needs to see them.
 */
export default function useDriveInput() {
  const inputRef = useRef({ forward: 0, turn: 0 });
  const keysRef = useRef({ forward: false, back: false, left: false, right: false });
  const touchActive = useRef(false);

  useEffect(() => {
    const recompute = () => {
      if (touchActive.current) return; // touch input takes priority while dragging
      const k = keysRef.current;
      inputRef.current.forward = (k.forward ? 1 : 0) - (k.back ? 1 : 0);
      inputRef.current.turn = (k.left ? 1 : 0) - (k.right ? 1 : 0);
    };
    const handleDown = (e) => {
      const action = KEY_MAP[e.code];
      if (!action) return;
      keysRef.current[action] = true;
      recompute();
    };
    const handleUp = (e) => {
      const action = KEY_MAP[e.code];
      if (!action) return;
      keysRef.current[action] = false;
      recompute();
    };
    window.addEventListener("keydown", handleDown);
    window.addEventListener("keyup", handleUp);
    return () => {
      window.removeEventListener("keydown", handleDown);
      window.removeEventListener("keyup", handleUp);
    };
  }, []);

  const setTouchInput = (forward, turn) => {
    touchActive.current = true;
    inputRef.current.forward = forward;
    inputRef.current.turn = turn;
  };

  const releaseTouchInput = () => {
    touchActive.current = false;
    inputRef.current.forward = 0;
    inputRef.current.turn = 0;
  };

  return { inputRef, setTouchInput, releaseTouchInput };
}
