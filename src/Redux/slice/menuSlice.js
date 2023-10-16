import { createSlice } from "@reduxjs/toolkit"
import { MENU_ITEMS } from "../../constants";


const initialState = {
    activeMenuItem: MENU_ITEMS.PENCIL,
    actionMenuItem:null
};

export const menuSlice = createSlice({
    name: "menu",
    initialState,
    reducers:{
      activeItemClick : (state,action) => {
       state.activeMenuItem =  action.payload
      },
      actionItemClick : (state,action) =>{
        state.actionMenuItem = action.payload
      }
    }
});

export const { actionItemClick,activeItemClick } = menuSlice.actions

export default menuSlice.reducer