export const ToDoItem = ({todo, onDel, onRev}) => {
    return <>
        <div className={todo.completed?"done":""}>
            <p>{todo.text}</p>
            <button onClick={() => {onDel(todo.id)}}>delete</button>
            <button onClick={() => {onRev(todo.id)}}>{todo.completed ? "cancel":"complete"}</button>
        </div>
    </>
}