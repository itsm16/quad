import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import Nav from '../components/Nav'
import Modal from '../components/Modal'
import DetailsModal from '../components/DetailsModal'
import { useDispatch, useSelector } from 'react-redux'
import {setTodos} from '../store/features/todoSlice'


function Home() {
  const dispatch = useDispatch();
  const storedTodos = useSelector(state => state.todo.todos);
  console.log(storedTodos);
  
  
  useEffect(()=>{
    dispatch(setTodos());
  },[])

  return (
    <>
    <Nav/>
    <Main/>
    <Modal/>
    <DetailsModal/>
    </>
  )
}

export default Home