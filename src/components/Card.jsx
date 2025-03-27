import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailsModal, useApi } from '../store/features/uiSlice';
import { deleteTodo } from '../store/features/todoSlice';

function Card({ title = "title", desc = "Check (get place details) and create todo, now click on show details in the card for minimap and city details", id, api }) {
  const dispatch = useDispatch();
  const uiStore = useSelector(state => state.ui.ui);
  const showModal = uiStore.showDetails;
  const [readMore, setMore] = useState(false);

  function showDetails(id) {
    console.log("Clicked ID:", id); // Debugging log
    dispatch(setDetailsModal(id));
    dispatch(useApi(api));
  }

  return (
    <div className='border hover:scale-105 delay-100 border-gray-300/20 flex flex-col bg-gray-700/40 w-full h-[220px] justify-between rounded-lg p-2'>
      <div className='flex flex-col w-full'>
        {/* Delete Button */}
        <div
          onClick={() => dispatch(deleteTodo({id}))}
          className='self-end cursor-pointer text-white rounded-full font-semibold text-xs flex items-center justify-center'
        >
          X
        </div>

        {/* Title & Description */}
        <div className='flex flex-col'>
          <h3 className="text-white font-semibold text-xs">{title}</h3>
          <p className='text-gray-300 text-xs hover:text-white w-full break-words overflow-hidden text-ellipsis'>
            {desc}
          </p>
        </div>
      </div>

      {/* Show Details Button */}
      {api.type !== "general" ?
        <button
          onClick={() => showDetails(id)}
          className='text-xs text-blue-400 hover:text-blue-300 cursor-pointer self-end'
        >
          Show Details
        </button>
        : ""
      }
    </div>
  );
}

export default Card;
