import { useContext } from "react"
import { ToDoContext } from "../context/Provider"
import axios from "axios";

export default function ToDoItem ({todo}){
    const { dispatch } = useContext(ToDoContext);

    const handleDelete = () => {
        axios.delete(`http://localhost:4002/users/${todo.id}`)
        .then(() => {
            dispatch({type: "Delete", payload: todo.id})
        })
    }

    const handleSalaryUp = () => {
        axios.patch(`http://localhost:4002/users/${todo.id}`, {salary: todo.salary + 10000})
        .then(response => {
            dispatch({type: "Update", payload: response.data});
        })
    }

    const handleSalaryDown = () => {
        axios.patch(`http://localhost:4002/users/${todo.id}`, {salary: todo.salary - 10000 >= 0? todo.salary - 10000: todo.salary})
        .then(response => {
            dispatch({type: "Update", payload: response.data});
        })
    }

    return <div style={{border: "1px solid black", display: "flex",justifyContent: "space-between",alignItems: "center", margin: "10px", padding: "10px 20px"}}>
        <p>Name - {todo.name}</p>
        <p>Lastname - {todo.lastname}</p>
        <p>Salary -  {todo.salary}USD</p>
        <button onClick={() => handleDelete()}>Delete</button>
        <button onClick={() => handleSalaryUp()}>SalaryUp</button>
        <button onClick={() => handleSalaryDown()}>SalaryDown</button>
    </div>
}