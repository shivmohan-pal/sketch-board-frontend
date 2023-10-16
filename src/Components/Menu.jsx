import { FaPencilAlt, FaEraser, FaUndoAlt, FaRedoAlt, FaFileDownload } from 'react-icons/fa';
import { MENU_ITEMS } from '../constants';
import { useDispatch, useSelector } from 'react-redux';
import { actionItemClick, activeItemClick } from '../Redux/slice/menuSlice';
import { useEffect } from 'react';

const Menu = ()=>{
  const dispatch = useDispatch();
  const activeItem = useSelector((state)=> state.menu.activeMenuItem)

  const handleMenuItem=(itemName)=>{
     dispatch(activeItemClick(itemName));
  }
  const handleActionMenuItem=(itemName)=>{
    dispatch(actionItemClick(itemName));
 }
 
 useEffect(()=>{
  const handleKeypres=(e)=>{
    const ctrlZ =()=> dispatch(actionItemClick(MENU_ITEMS.UNDO));
    const ctrlY =()=> dispatch(actionItemClick(MENU_ITEMS.REDO));   
    if(e.ctrlKey){
       if(e.key==='z') ctrlZ();
       if(e.key==='y') ctrlY();
      }
      return
  }
 window.addEventListener("keypress",handleKeypres);

 return ()=>{
 window.removeEventListener("keypress",handleKeypres);
 }
});

 return (
    <div className='menu inline-flex gap-6 my-5 p-2 border-1 rounded-2 fixed left-50'>
        <div className={`icon pointer p-2 rounded-2 ${activeItem===MENU_ITEMS.PENCIL?"active":''}`} onClick={()=>handleMenuItem(MENU_ITEMS.PENCIL)}>
          <FaPencilAlt size={'1.25rem'} />
        </div>
        <div className={`icon  pointer p-2 rounded-2 ${activeItem===MENU_ITEMS.ERASER?"active":''}`} onClick={()=>handleMenuItem(MENU_ITEMS.ERASER)}>
          <FaEraser size={'1.25rem'} />
        </div>
        <div className='icon  pointer p-2 rounded-2' onClick={()=>handleActionMenuItem(MENU_ITEMS.UNDO)}>
          <FaUndoAlt size={'1.25rem'} />
        </div>
        <div className='icon  pointer p-2 rounded-2' onClick={()=>handleActionMenuItem(MENU_ITEMS.REDO)}>
          <FaRedoAlt size={'1.25rem'} />
        </div>
        <div className='icon  pointer p-2 rounded-2' onClick={()=>handleActionMenuItem(MENU_ITEMS.DOWNLOAD)}>
          <FaFileDownload size={'1.25rem'} />
        </div>
    </div>
);
}

export default Menu