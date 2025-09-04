import axios from "axios"
import { useState } from "react"
export const AddUser = ({onAdd}) => {
    const [ user, setUser ] = useState({name: "", age: ""})
    const [ error, setError ] = useState("");

    const isNum = age => {
        let num = Number(age);
        return num > 0 && Number.isInteger(num);
    }

    const handleSumbit = event => {
        event.preventDefault()
        if(!user.age || !user.name) {
            setError("Please enter the inputs ")
        }
        else if(!isNum(user.age)) {
            setError("Please enter your age");
        }
        else {
            axios.post("http://localhost:4002/users",user)
            .then(response => {
            onAdd(response.data)
            setError("")
            })
        }
        setUser({name: "", age: ""})
    }

    return <div className="col-md-4">

        <h2>Add user</h2>
        <form onSubmit={handleSumbit}>
            {error && <p style={{color: "red"}}>{error}</p>}
            <div>
                <label>name</label>
                <input type="text" className="form-control" value={user.name} onChange={e => setUser({...user, name:e.target.value})}/>
            </div>

            <div>
                <label>age</label>
                <input type="text"  className="form-control" value={user.age} onChange={e => setUser({...user, age:e.target.value})}/>
            </div>
            <button className="btn btn-outline-success">save</button>
            
        </form>
    </div>
}