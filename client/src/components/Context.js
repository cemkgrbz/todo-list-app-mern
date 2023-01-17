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

            case 'logout':

                return {
                    user: {todos: []}
                }


            case 'addTodo':
                return {
                    ...state,
                    user: action.payload
                }

            case 'removeTodo':

                return {
                    ...state,
                    user: action.payload
                }
            
            case 'completeTodo':

                return {
                    ...state,
                    user: action.payload
                    }

            case 'uncompleteTodo':

                return {
                    ...state,
                    user: action.payload
                    }
                

            default:
                
            return state
        }
    }

    const [state, dispatchState] = useReducer(reducer, {
        user: {todos: []}
    })

    return <AppContext.Provider value={{state, dispatchState}}>
     {children}
    </AppContext.Provider>
}