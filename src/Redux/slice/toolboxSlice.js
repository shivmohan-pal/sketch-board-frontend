import { createSlice } from "@reduxjs/toolkit";
import { COMMON_COLORS, MENU_ITEMS } from "../../constants";

const initialState = {
    [MENU_ITEMS.PENCIL]:{color:COMMON_COLORS.BLACK,size:3},
    [MENU_ITEMS.ERASER]:{color:"#FFFFFF",size:3},
    [MENU_ITEMS.UNDO]:{},
    [MENU_ITEMS.REDO]:{},
    [MENU_ITEMS.DOWNLOAD]:{}
}

export const toolboxSlice = createSlice({
    name:'toolbox',
    initialState,
    reducers : {
        changeColor: (state,action)=>{
          state[action.payload.item].color = action.payload.color;
        },
        changeBrushSize : (state,action)=>{
            state[action.payload.item].size = action.payload.size;
        }
    }

})

export const {changeColor,changeBrushSize} = toolboxSlice.actions;
export default toolboxSlice.reducer;