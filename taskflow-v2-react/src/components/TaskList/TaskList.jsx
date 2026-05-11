import TaskItem from "./TaskItem";

function TaskList( {tasks}){
    return (
        <div>
            <h2>Task List</h2>
            {
                tasks.length === 0 ? (
                    <p>No tasks yet</p>
                ) : (
                    tasks.map( (task=>(
                        <TaskItem key={task.id} task={task}/>
                    )))
                )
            }
        </div>
    );
}

export default TaskList;