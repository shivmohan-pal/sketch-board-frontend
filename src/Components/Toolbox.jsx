import { useDispatch, useSelector } from "react-redux";
import { COMMON_COLORS, MENU_ITEMS } from "../constants";
import { changeBrushSize, changeColor } from "../Redux/slice/toolboxSlice";


const Toolbox = () => {
    const activeItem = useSelector((state) => state.menu.activeMenuItem);
    const { color, size } = useSelector((state) => state.toolbox[activeItem]);
    const dispatch = useDispatch();
    const showColors = activeItem === MENU_ITEMS.PENCIL;

    const clickChangeColor = (colorCode) => {
        if(activeItem === MENU_ITEMS.PENCIL)
        dispatch(changeColor({ item: activeItem, color: colorCode }));
    }
    const colorChange =(e)=>{
        const { value } = e.target; 
        if(activeItem === MENU_ITEMS.PENCIL)
        dispatch(changeColor({ item: activeItem, color: value }));
    }

    const changeSize = (e) => {
        dispatch(changeBrushSize({ item: activeItem, size: e.target.value }))
    }

    return (
        <div className="toolbox inline-block p-2 m-3 border-1 rounded-3 w-7 absolute top-25 z-1">
            {showColors &&
                <div>
                    <h4 className="my-2 weight-4">Brush Color</h4>
                    <div className="flex gap-2 items-center justify-center my-4">
                        <input className="h-4 w-4 border-1 circle" type="color" value={color} onChange={colorChange}/>
                        <input className="p-1 rounded-2 border-1 w-6" type="text" placeholder="E.g. #Fe12a2 (hex value only)" pattern="^#([a-fA-F]|[0-9]){6}$" value={color} onChange={colorChange} />
                    </div>
                    <div className="flex justify-center gap-4 my-3">
                        <div className={`color-box w-2 h-2 p-2 border-1 rounded-1 ${color === COMMON_COLORS.BLACK ? 'active' : ''}`} style={{ background: COMMON_COLORS.BLACK }} onClick={() => clickChangeColor(COMMON_COLORS.BLACK)}></div>
                        <div className={`color-box w-2 h-2 p-2 border-1 rounded-1 ${color === COMMON_COLORS.RED ? 'active' : ''}`} style={{ background: COMMON_COLORS.RED }} onClick={() => clickChangeColor(COMMON_COLORS.RED)}></div>
                        <div className={`color-box w-2 h-2 p-2 border-1 rounded-1 ${color === COMMON_COLORS.GREEN ? 'active' : ''}`} style={{ background: COMMON_COLORS.GREEN }} onClick={() => clickChangeColor(COMMON_COLORS.GREEN)}></div>
                        <div className={`color-box w-2 h-2 p-2 border-1 rounded-1 ${color === COMMON_COLORS.BLUE ? 'active' : ''}`} style={{ background: COMMON_COLORS.BLUE }} onClick={() => clickChangeColor(COMMON_COLORS.BLUE)}></div>
                        <div className={`color-box w-2 h-2 p-2 border-1 rounded-1 ${color === COMMON_COLORS.YELLOW ? 'active' : ''}`} style={{ background: COMMON_COLORS.YELLOW }} onClick={() => clickChangeColor(COMMON_COLORS.YELLOW)}></div>
                    </div>
                </div>}
            <div className="py-2">
                <h4 className="my-2 weight-4">Brush Size</h4>
                <div className="flex justify-space-btw py-1 items-end">
                    <span className="weight-2">1</span>
                    <span className="weight-4 px-2 py-1 border-1 rounded-2">{size}</span>
                    <span className="weight-2">20</span>
                </div>
                <input className="w-100" type="range" min={1} step={1} max={20} value={size} onChange={changeSize} />
            </div>
        </div>
    );
}

export default Toolbox;