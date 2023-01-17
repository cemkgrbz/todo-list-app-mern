import { createContext, useReducer } from "react";

export const AppContext = createContext()

export default function ContextProvider({children}) {

    const reducer = (state, action) => {

        switch(action.type) {

            case 'login':

            return {
                ...state,
                user: {...action.payload}
            }

            case 'loadUsers':

            return {
                ...state,
                users: [...action.payload]
            }

            case 'logout':

                return {
                    user: {},
                    todos: []
                }


            case 'getTodos':

                return {
                    ...state,
                    todos: [...action.payload]
                }

            case 'addTodo':
                return {
                    ...state,
                    todos: [...state.todos, action.payload]
                }

            case 'removeTodo':

                const oldList = [ ...state.todos.filter(item => item._id !== action.payload)]
    
                return {
                    ...state,
                    todos: [...oldList]
    
                }

            default:
                
            return state
        }
    }

    const [state, dispatchState] = useReducer(reducer, {
        user: {},
        todos: []
    })

    return <AppContext.Provider value={{state, dispatchState}}>
     {children}
    </AppContext.Provider>
}