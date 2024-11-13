import { ChangeEvent } from "react"
import { Task } from "../domain/Task"

type TaskProps = {
    task:               Task,
    handleCheckbox:     (event: ChangeEvent<HTMLInputElement>, task: Task) => void,
    handleButtonDelete: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, task: Task) => void,
}

export const TaskCheckbox: React.FC<TaskProps> = ({ task, handleCheckbox, handleButtonDelete }) => {


    return(
        <div className="card">
            <div className="card-body">
                <label>
                    <input type="checkbox" 
                        checked={task.done} 
                        onChange={ (event) => handleCheckbox( event, task) } 
                    />{task.subject}
                </label>
                <button type="button" className="btn-close" 
                    onClick={(event) => handleButtonDelete(event, task) }
                />
            </div>
        </div>

    )
}



