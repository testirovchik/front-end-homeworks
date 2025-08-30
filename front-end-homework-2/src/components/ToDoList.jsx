import { AddToDo } from "./AddToDo"
import { ToDoFilter } from "./ToDoFilter"
import { List } from "./List"
import { useState } from "react"


export const ToDoList = () => {
    const [ todos, setTodos ] = useState([
        { id: 101, text: "read a book", completed: false },
        { id: 102, text: "go for a walk", completed: true },
        { id: 103, text: "practice JavaScript", completed: false },
        { id: 104, text: "call a friend", completed: false },
        { id: 105, text: "buy groceries", completed: true },
        { id: 106, text: "write in journal", completed: false },
        { id: 107, text: "clean the room", completed: true },
        { id: 108, text: "exercise for 30 minutes", completed: false }
    ])
    const handleDelete = id => {
        setTodos(todos.filter(item => item.id != id))
    }

    const arr = ["all", "active", "completed"];
    const [ currentFilter, setCurrnentFilter ] = useState("all");

    const changeState = name => {
        setCurrnentFilter(name);
    }

    const rev = id => {
        setTodos(todos.map(item => {
            if(item.id == id) {
                item.completed = !item.completed;
                return item;
            }
            return item;
        }))
    }

    const handleAdd = text => {
        setTodos([...todos,{id: Date.now(),text,completed: false}])
    }
    return <>
        <AddToDo onAdd = {handleAdd}/>
        <ToDoFilter onArr = {arr} onChange = {changeState} onFilter = {currentFilter}/>
        <List items = {todos} onDel = {handleDelete} onRev = {rev} onCurrent = {currentFilter}/>
    </>
}