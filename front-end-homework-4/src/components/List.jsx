import { useContext } from "react"
import { ToDoContext } from "../context/Provider"
import ToDoItem from "./ToDoItem";

export default function List () {
    const { state } = useContext(ToDoContext);
    return <>
    {
        state.users.map(todo => <ToDoItem key = {todo.id} todo = {todo}/>)
    }
    </>
}