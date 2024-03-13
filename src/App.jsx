import { useEffect, useState } from "react"
import "./styles.css"
import NewTodoForm from "./NewTodoForm"
import TodoList from "./TodoList"

export default function App() {  
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })
  
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    //compare commented block below
        //adds a function to 'setTodos' and return the new value for the state
        //this function takes in an argument, which is the current value of the state
        setTodos(currentTodos => {
          return [
            // '...' adds 'curentTodos' to existing array, 
            ...currentTodos,
            { id: crypto.randomUUID(), title, completed: false 
            },
          ]
        })
        /*
        gets the value for 'todos' which is always declared as an empty array in
        beginning of function and then adds latest 'todos' as a new value on the end of 
        that array.    
        setTodos([
            ...todos,
            { id: crypto.randomUUID(), title: newItem, completed: false 
            },
          ]
        })
        */
  }

  function toggleTodo(id, completed) {
    //takes in current todos as currentTodos and maps through all objects in array,
    //then checks if id of todo is the same as the one passed to toggleTodo, if so it returns
    //a the todo as a new todo with the property 'completed' toggled to the array
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return {...todo, completed}
        }
        //if todo.id do not match the id passed to the function it returns the todo as is
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
        return currentTodos.filter(todo => todo.id !== id)
    })
  }
  //console.log(todos)
  return <>
  <NewTodoForm onSubmit={addTodo}/>
    <h1 className="header">Todo List</h1>
    <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
  </>
}