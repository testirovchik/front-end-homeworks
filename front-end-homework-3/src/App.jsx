import axios from "axios";
import { AddUser } from "./components/add-user";
import { UserList } from "./components/user-list";
import { useState, useEffect } from "react";

export default function App() {
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
      axios.get("http://localhost:4002/users")
      .then(response => {
          setUsers(response.data);
      })
  }, [])

  const handleDelete = id => {
    axios.delete(`http://localhost:4002/users/${id}`)
    setUsers(users.filter(user => user.id != id))
  }

  const handleAdd = user => setUsers([...users, user]);
  
  return <div className="row">
    <h1>Workshop</h1>
    <UserList users = {users} onDelete = {handleDelete}/>
    <AddUser onAdd = {handleAdd}/>
  </div>
}