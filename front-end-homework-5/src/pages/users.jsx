import axios from "axios";
import { useEffect, useState } from "react"
import { Link} from "react-router-dom";

export const Users = () => {
    const [ users, setUsers ] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:4002/users")
        .then(res => setUsers(res.data))
    }, []);
    return <div style={{display:"flex",justifyContent:"space-between"}}>
        <div>
            {
                users.map(user => <div key={user.id} style={{border: "1px solid black"}}>
                    <p>{user.name}</p>
                    <p>{user.age} years old</p>
                    <Link to={"/users/" + user.id}>details</Link>
                </div>)
            }
        </div>
        <div>
            <h2>Add User</h2>
            <Link to={"/add"}>click here to add user</Link>
        </div>
    </div>
}