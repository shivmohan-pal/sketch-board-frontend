import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./slice/menuSlice";
import toolboxReducer from "./slice/toolboxSlice";
export default configureStore ({
    reducer : {
       menu: menuReducer,
       toolbox: toolboxReducer
    }
})