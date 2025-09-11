import axios from "axios";
import { ToDoContext } from "../context/Provider"
import { useContext, useState } from "react"

export default function AddToDo () {
    const { state, dispatch } = useContext(ToDoContext);
    const [user, setUser ] = useState({name:"", lastname:"", salary: ""});

    const handleSubmit = event => {
        event.preventDefault();
        axios
        .post("http://localhost:4002/users", user)
        .then(response => {
            dispatch({type: "Add", payload: response.data});
            setUser({name:"", lastname: "", salary: ""})
        })
    }

    return <>
        <h1>Add User</h1>
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input type="text"
                value={user.name}
                onChange={e => setUser({...user, name: e.target.value})}
             />

            <br /><br />

            <label>Lastname</label>
            <input type="text"
                value = {user.lastname}
                onChange={e => setUser({...user, lastname:e.target.value})}
            />

            <br /><br />

            <label>Salary</label>
            <input type="text"
                value = {user.salary}
                onChange={e => setUser({...user, salary:Number(e.target.value)})}
            />

            <button>submit</button>
        </form>
    </>
}