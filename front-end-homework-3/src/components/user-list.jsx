
export const UserList = ({users, onDelete}) => {

    return <div className="col-md-8">
        <h2>User list</h2>
        <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>age</th>
                    <th>actions</th>
                </tr>
            </thead>

            <tbody>
                {
                    users.map(user => <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>
                            <button onClick={() => onDelete(user.id)} className="btn btn-danger btn-sm mx-2">Delete</button>
                            <button className="btn btn-success btn-sm mx-2">Edit</button>
                        </td>
                    </tr>)
                }
            </tbody>

        </table>
    </div>
}