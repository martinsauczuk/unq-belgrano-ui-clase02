import { ChangeEvent, SyntheticEvent, useState } from "react"
import { TaskCheckbox } from "./Components/TaskCheckbox"
import { Task } from "./domain/Task"

const initialTasks: Task[] = [
    {
        done: false,
        subject: 'Ordenar el dormitorio',

    }, 
    {
        done: true,
        subject: 'Comprar yerba para el mate'
    }
]

export const App = () => {

    
    const [ tasks, setTasks ] = useState<Task[]>(initialTasks);


    const handleCheckbox  = (event: ChangeEvent<HTMLInputElement>, taskCheck: Task) => {
        console.log(event.target.checked);
        console.log(taskCheck);

        taskCheck.done = !taskCheck.done;

        setTasks([...tasks]);
    }

    const handleButtonDelete  = (event: SyntheticEvent, taskToDelete: Task) => {
        console.log('OnDelete');
        console.log(taskToDelete);
    }

    console.log('rendering App');
    console.log(tasks);
    
    
    return(
        <div className="container">
            <div className="row">
                <h3>Lista de tareas</h3>
            </div>
            <div>
                Totales
            </div>
            <div className="row">
                {
                    tasks.map( (task) => <TaskCheckbox task={task} handleCheckbox={handleCheckbox} handleButtonDelete={handleButtonDelete} key={task.subject}/>)
                }
            </div>
        </div>
    )


    
}