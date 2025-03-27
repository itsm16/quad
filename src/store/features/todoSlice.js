import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "todo",
    initialState: {
        todos: []
    },
    reducers: {
        // for todo

        setTodos: (state) => {
            const { todos } = state;
            const localTodos = JSON.parse(localStorage.getItem("localTodos"));
            console.log("Local Todos:", localTodos);
            if (!localTodos || localTodos.length === 0) {
                return;
            }
            state.todos = localTodos;
            console.log("Updated Todos:", state.todos);
        },
        addTodo: (state, action) => {
            const { todos } = state;
            let localTodos = JSON.parse(localStorage.getItem("localTodos"));
        
            if (!localTodos) { 
                localTodos = [];
            }
            
            localTodos.push(action.payload); 
        
            localStorage.setItem("localTodos", JSON.stringify(localTodos)); 
        
            state.todos.push(action.payload); 
        },
        deleteTodo: (state, action) => {
            const {todos} = state;
            const {payload} = action;
            let localTodos = JSON.parse(localStorage.getItem("localTodos"));

            state.todos = state.todos.filter(ele => ele.id !== payload.id);

            localTodos = localTodos.filter(ele => ele.id !== payload.id);
            localStorage.setItem("localTodos", JSON.stringify(localTodos));
        },
        useApi: ()=>{
            
        }
        
        

    }
})

export const { setTodos, addTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;