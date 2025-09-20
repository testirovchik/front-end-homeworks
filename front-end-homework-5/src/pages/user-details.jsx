import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export const UserDetails = () => {
    const { id } = useParams();
    const [ user, setUser ] = useState(null);
    useEffect(() => {
        axios.get("http://localhost:4002/users/" + id)
        .then(res => setUser(res.data))
    }, [id])
    return <>
        {
            user && <div>
                <h2>{user.name}</h2>
                <p>{user.age} years old</p>
            </div>
        }
    </>
}