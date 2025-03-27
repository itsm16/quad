import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setDetailsModal } from '../store/features/uiSlice';
import { deleteTodo } from '../store/features/todoSlice';

function Card({ title = "title", desc = "desc", id }) {  // Removed key from props
  const dispatch = useDispatch();
  const uiStore = useSelector(state => state.ui.ui);
  const showModal = uiStore.showDetails;
  const [readMore, setMore] = useState(false);

  return (
    <div key={id} className='border hover:scale-105 delay-100 border-gray-300/20 flex flex-col bg-gray-700/40 w-full h-[220px] justify-between rounded-lg p-2'>
      <div className='flex flex-col w-full'>
        <div 
        onClick={(ele)=>dispatch(deleteTodo({id}))}
        className='self-end w-1 h-1 cursor-pointer text-white rounded-full font-semibold text-xs flex items-center justify-center'>X</div>
        <div className='flex flex-col '>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <p className='text-gray-300 text-xs hover:text-white w-full break-words overflow-hidden text-ellipsis'>
            {desc}
          </p>

        </div>
      </div>
      <button
        onClick={() => dispatch(setDetailsModal(id))}
        className='text-xs text-blue-400 hover:text-blue-300 cursor-pointer self-end'
      >
        Show Details
      </button>
    </div>
  );
}

export default Card;
