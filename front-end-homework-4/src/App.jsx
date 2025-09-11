import ToDoList from "./components/ToDoList";
import { ToDoProvider } from "./context/Provider";


export default function App() {
    return <>
        <ToDoProvider>
            <ToDoList />
        </ToDoProvider>
    </>
}