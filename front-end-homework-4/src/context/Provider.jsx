import { createContext, useReducer } from "react";
import { reducer } from "./Reducer";
import { useEffect } from "react";
import axios from "axios";
export const ToDoContext = createContext();


const initialState = { users: [] };

export const ToDoProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    useEffect(() => {
    axios.get("http://localhost:4002/users")
        .then(res => {
            dispatch({ type: "SetUsers", payload: res.data });
        });
    }, []);

    return <ToDoContext.Provider value={ {state, dispatch} }>
            {children}
        </ToDoContext.Provider>
}