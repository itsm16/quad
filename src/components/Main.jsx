import React from 'react'
import Card from './Card'
import { useSelector } from 'react-redux'

function Main() {
  const todos = useSelector(state => state.todo.todos);
  
  return (
    <div className='main flex flex-col items-center z-5'>
      { todos.length !== 0 ?
      <div className=' max-w-[97%] md:w-[95%] h-full min-h-full md:mt-1 grid grid-cols-1 md:grid-cols-4 gap-2'>
        <Card title={"Places/Map functionality integration with todo"} api={{type: "visit", city: "Delhi"}} id={0}/>
        { 
          todos.map(ele => (
            <Card 
              id={ele.id}
              key={ele.id}
              title={ele.title}
              desc={ele.desc}
              api={ele.api}
            />
          )) 
        }
      </div>
        :
        <div className='text-lg mt-3 animate-pulse'>No todos ...</div>
      }
    </div>
  )
}

export default Main
