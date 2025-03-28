import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout, rmAccount } from '../store/features/userSlice';
import { useNavigate } from 'react-router';
import { LuMenu, LuPlus } from 'react-icons/lu';
import { setModal } from '../store/features/uiSlice';

function Nav() {
  const store = useSelector(state => state.user.user);
  const name = store.name;
  const uiStore = useSelector(state => state.ui.ui);
  const showModal = uiStore.addModal; 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log("nav", store);

  // console.log(showModal);
  
  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  function deleteAcc() {
    dispatch(rmAccount());
    navigate("/signup");
  }

  return (
    <div className='h-[80px] flex items-center top-0 justify-center md:px-[150px] sticky'>
      <div className='md:w-[90%] md:min-w-[600px] w-[94%] z-15 border-white/10 border rounded-xl bg-gray-200/10 backdrop-blur-xs flex justify-between px-12 h-[80%] mt-2 items-center'>
        <div className='flex items-center gap-2 md:gap-5'>
          <div className='cursor-pointer text-xl font-semibold'>Todo.</div>
          
        </div>
        <div className=' flex items-center gap-3'>
        <button 
        onClick={()=>dispatch(setModal())}
        className='btn btn-sm bg-white text-black rounded-lg '>+ Add Todo</button>
        {store.name !== null ?
        
        <div tabIndex={0} className='dropdown dropdown-start dropdown-bottom dropdown-end w-11 h-11 border-white/10 rounded-full border'>
          
          <div role='button' className='w-full h-full cursor-pointer rounded-full bg-white text-black flex items-center justify-center font-semibold'>
            
            <div className='capitalize'>{(store.name && store?.name[0])}</div>
            <ul tabIndex={0} className="bg-white font-normal mr-17 text-black mt-2 dropdown-content dropdown-left menu rounded-box z-1 min-w-fit divide-y w-[200px] p-1  shadow-sm">
              <li className='py-2 pl-2'>User Details -</li>
              <li className='py-2 pl-2'>Name : {store.name}</li>
              <li className='py-2 pl-2'>Email : {store.email}</li>
              <li onClick={handleLogout} className=' font-semibold backdrop-blur-xs pl-2 py-1 hover:bg-black hover:text-white'>Logout</li>
              <li className='py-1 pl-2 font-semibold text-red-500' onClick={deleteAcc}>Delete Account</li>
            </ul>
          </div>
        </div>
        :
        <div></div>
      }
        </div>
        
      </div>
    </div>
  )
}

export default Nav