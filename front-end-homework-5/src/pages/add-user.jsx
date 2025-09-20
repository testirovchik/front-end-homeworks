import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";

export const AddUser = () => {
    const [ userAdd, setUserAdd ] = useState({name: "", age: ""})
    const navigate = useNavigate()
    const handleAdd = (event) => {
        event.preventDefault();
        axios.post("http://localhost:4002/users", userAdd).
        then((res) => {
            console.log(res.data)
            navigate("/")
        })
    } 
    return <>
        <div>
            <h1>Add user</h1>
            <form onSubmit={handleAdd}>
                <label>Name</label>
                <input type="text" onChange={e => setUserAdd({name: e.target.value, age: userAdd.age})} value={userAdd.name}/>
                <br />
                <label>Age</label>
                <input type="text" onChange={e => setUserAdd({name: userAdd.name, age: e.target.value})} value={userAdd.age}/>
                <br />
                <button>Submit</button>
            </form>
        </div>
    </>
}