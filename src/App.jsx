import React, { useEffect, useReducer } from 'react'
import { Route, Routes, useNavigate, useSearchParams } from 'react-router'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useDispatch, useSelector } from 'react-redux'
import { login, persistLogin } from './store/features/userSlice'
import Test from './components/Test'
import Home from './pages/Home'

function App() {
  const store = useSelector(state => state.user.user);
  const navigate = useNavigate();
  const storeUser = store.name;
  const localCurrent = localStorage.getItem("current");
  const parsedCurrent = JSON.parse(localCurrent);
  const currentUser = parsedCurrent?.name;
  const dispatch = useDispatch();

  // console.log("pc", parsedCurrent);
  //  console.log("lc", localCurrent);
  //  console.log("cur", currentUser)
   
   
   useEffect(()=>{
    currentUser && dispatch(persistLogin({name: currentUser, email: parsedCurrent.email}));
    // localCurrent == {} ? navigate("/login") : ""
    currentUser === null || !currentUser ? navigate("/login") : ""
   },[])

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App