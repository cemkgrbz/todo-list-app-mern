import { useState, useEffect, useContext } from "react" 
import axios from 'axios'
import {AppContext} from './components/Context'


// const API_BASE = "http://localhost:3001"

function App() {

  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("")

  const {state, dispatchState} = useContext(AppContext)

  useEffect(() => {

    async function getData() {

        const response = await axios.get('/todos/list')
        console.log("response", response)

        dispatchState({
            type: 'getTodos',
            payload: response.data.todos
        })
    }

    getData()

}, [])
  
  // console.log("🚀 ~ file: App.js:8 ~ App ~ todos", todos)
  // const GetTodos = () => {

  //   fetch(API_BASE + "/todos")
  //     .then(res => res.json())
  //     .then(data => setTodos(data))
  //     .catch(err => console.error("Error: ", err))
  // }


  const completeTodo = async (id) => {

    const data = await axios.get('todos/complete')
    console.log("🚀 ~ file: App.js:46 ~ completeTodo ~ data", data)
    // const data = await fetch(API_BASE + "/todo/complete/" + id)
    //   .then(res => res.json())

    setTodos(todos => todos.map(todo=> {
      if (todo._id === data._id) {
        todo.complete = data.complete
      }

      return todo;
    }))
  }

  const deleteTodo = async (id) => {

    const response = await axios.delete('todos/delete' + id)
    console.log("🚀 ~ file: App.js:62 ~ deleteTodo ~ response", response)
    
    if (response.data.success) {

      dispatchState({
          type: 'removeTodo',
          payload: id
      })

  } else {
      if (response.data.errorId === 1) {
          alert('Todo not found')
      }
  }
    // const data = await fetch(API_BASE + "/todo/delete/" + id, {
    //   method: "DELETE"
    // }).then(res => res.json())

    // setTodos(todos => todos.filter(todo => todo._id !== data._id))

  }

  const addTodo = async () => {

      // const formdata = new FormData()
  
      // formdata.set('todo', todos.text)
    
      // const config = {
      //   Headers: {
      //     'content-type': 'multipart/form-data'
      //   }
      // }
  
      const response = await axios.post('/todos/add', {newTodo})
      console.log("🚀 ~ handleSave ~ response", response)
  
  
      if (response.data.success) {
      
          dispatchState({
              type: 'addTodo',
              payload: response.data.todo.text
          })

          setTodos([...todos, response])
          setPopupActive(false)
          setNewTodo("")
      
      }
    }
  

    // const data = await axios.post('todos/add')

    // const data = await fetch(API_BASE + "/todo/new", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     text: newTodo
    //   }) 
    // }).then(res => res.json())
    // console.log("🚀 ~ file: App.js:61 ~ addTodo ~ data", data)

    // setTodos([...todos, data])
    // setPopupActive(false)
    // setNewTodo("")
  // }

  return (
    <div className="App">
      
      <h1>Welcome to the List</h1>

      <div className="todos">
        {
          todos.length === 0 ? <h3>Please add a task</h3> : <h3>Your tasks</h3>
        }

        {
          todos.map(todo => (
            <div className={"todo " + (todo.complete ? "is-complete" : "")} key={todo._id} onClick={() => completeTodo(todo._id)}>
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" onClick={() => deleteTodo(todo._id)}>x</div>
            </div>

          ))
        }
      </div>
      
      <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
       {
        popupActive ? (
          <div className="popup">
            <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>

            <div className="content">
              <h3>Add Task</h3>
              <input 
                type="text"
                className= "add-todo-input"
                onChange={e => setNewTodo(e.target.value)}
                value={newTodo}
              />
              <div className="button" onClick={addTodo}>Create Task</div>
            </div>
          </div>
        ) : ""
        }

    </div>
  );
}

export default App;
