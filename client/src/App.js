import { useState, useContext } from "react" 
import axios from 'axios'
import {AppContext} from './components/Context'


function App() {

  // const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("")

  const {state, dispatchState} = useContext(AppContext)
  

  const completeTodo = async (_id) => {

    const response = await axios.post('/users/todo/complete', {
        user: state.user._id,
        _id
    })
    console.log("🚀 ~ handleDelete ~ response", response)

    if (response.data.success) {
        dispatchState({
            type: 'completeTodo',
            payload: response.data.user
        })
    }
}

const uncompleteTodo = async (_id) => {

  const response = await axios.post('/users/todo/uncomplete', {
      user: state.user._id,
      _id
  })
  console.log("🚀 ~ handleDelete ~ response", response)

  if (response.data.success) {
      dispatchState({
          type: 'uncompleteTodo',
          payload: response.data.user
      })
  }
}

  const deleteTodo = async (id) => {

    const response = await axios.delete('users/todo/delete', {data: {user: state.user._id, id}})
    console.log("🚀 ~ file: App.js:62 ~ deleteTodo ~ response", response)
    
    if (response.data.success) {

      dispatchState({
          type: 'removeTodo',
          payload: response.data.updatedUser
      })

  }}

  const addTodo = async () => {

  
      const response = await axios.post('/users/todo/add', {user: state.user._id, text: newTodo})
      console.log("🚀 ~ handleSave ~ response", response)
  
  
      if (response.data.success) {
      
          dispatchState({
              type: 'addTodo',
              payload: response.data.user
          })

          // setTodos([...todos, response])
          setPopupActive(false)
          setNewTodo("")
      
      }
    }
  

  console.log("State - ", state)
  return (
    <div className="App">
      
      <h1 className="text-center mb-[5rem]">Welcome {state.user.username}!!!</h1>

      <div className="todos">
        {
          state?.user?.todos?.length === 0 ? <h3 className="text-center text font-black text-white bg-[#4b71b2] w-fit p-3 rounded-xl m-auto">Please add a task</h3> : <h4 className="font-black">Your tasks</h4>
        }

        {
          state?.user?.todos?.map(todo => (
            <div className={"todo " + (todo.complete ? "is-complete" : "")} key={todo._id} 
            onClick={todo.complete === false ? () => completeTodo(todo._id) : () => uncompleteTodo(todo._id)}
            >
              <div className="checkbox"></div>
              <div className="text">{todo.text}</div>
              <div className="delete-todo" 
              onClick={() => deleteTodo(todo._id)}
              >x</div>
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
