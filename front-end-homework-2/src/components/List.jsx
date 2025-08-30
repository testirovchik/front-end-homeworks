import { ToDoItem } from "./ToDoItem"

export const List = ({items, onDel, onRev, onCurrent}) => {
    return <div className="list">
        {
            items.map(todo => {
                if(onCurrent == "all") {
                    return <ToDoItem key={todo.id} todo = {todo} onDel = {onDel} onRev= {onRev}/>;
                }
                else if(onCurrent == "active" && !todo.completed) {
                    return <ToDoItem key={todo.id} todo = {todo} onDel = {onDel} onRev= {onRev}/>;
                }
                else if (onCurrent == "completed" && todo.completed){
                    return <ToDoItem key={todo.id} todo = {todo} onDel = {onDel} onRev= {onRev}/>;
                }
            })
        }
    </div>
}