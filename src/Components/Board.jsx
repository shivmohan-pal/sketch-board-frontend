import { useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MENU_ITEMS } from "../constants";
import { actionItemClick } from "../Redux/slice/menuSlice";


const Board = () => {
  const { activeMenuItem, actionMenuItem } = useSelector((state) => state.menu);
  const { color, size } = useSelector((state) => state.toolbox[activeMenuItem]);
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const canDraw = useRef(false);
  const drawHistory = useRef([]);
  const historyPointer = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    // console.log(navigator.userAgent); 

    if (drawHistory.current.length === 0) {
      const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imgData);
    }

    if (actionMenuItem === MENU_ITEMS.UNDO) {
      if (historyPointer.current > 0) {
        historyPointer.current -= 1;
        context.putImageData(drawHistory.current[historyPointer.current], 0, 0);
      }
    }
    if (actionMenuItem === MENU_ITEMS.REDO) {
      if (historyPointer.current < drawHistory.current.length - 1) {
        historyPointer.current += 1;
        context.putImageData(drawHistory.current[historyPointer.current], 0, 0);
      }
    }

    if (actionMenuItem === MENU_ITEMS.DOWNLOAD) {
      const dataURL = canvas.toDataURL();
      const anchor = document.createElement('a');
      anchor.href = dataURL;
      anchor.download = "sketch.png";
      anchor.click();
    }
    dispatch(actionItemClick(null));
  }, [actionMenuItem, dispatch]);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    const changeCanvasConfig = (color, size) => {
      context.strokeStyle = color;
      context.lineWidth = size;
    }

    changeCanvasConfig(color, size);

  }, [color, size]);

  useLayoutEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { willReadFrequently: true });

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const drawing = (x, y) => {
      context.lineTo(x, y);
      context.stroke();
    }

    const handlePointerDown = ({ clientX, clientY }) => {
      canDraw.current = true;
      context.beginPath();
      context.moveTo(clientX, clientY);
    }

    const handlePointerMove = ({ clientX, clientY}) => {
      if (!canDraw.current) return;
      drawing(clientX, clientY);
    }

    const handlePointerUp = (e) => {
      canDraw.current = false;
      const imgData = context.getImageData(0, 0, canvas.width, canvas.height);
      drawHistory.current.push(imgData);
      historyPointer.current = drawHistory.current.length - 1;

    }

    canvas.addEventListener("pointerdown", handlePointerDown); 
    canvas.addEventListener("pointermove", handlePointerMove);
    canvas.addEventListener("pointerup", handlePointerUp);

    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
      canvas.removeEventListener("pointerup", handlePointerUp);

    }
  }, []);

  return (
    <canvas className="board absolute" ref={canvasRef}></canvas>
  );
}

export default Board;