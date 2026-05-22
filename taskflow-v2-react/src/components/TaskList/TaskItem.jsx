function TaskItem({ task, deleteTask, toggleTask , editTask}) {
    return (
      <div className="task-item">
  
        <div className="task-left">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask(task.id)}
          />
  
          <p className={task.completed ? "completed" : ""}>
            {task.text}
          </p>
        </div>

        <button onClick={ ()=> editTask(task)}>
          Edit
        </button>
  
        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
  
      </div>
    );
  }
  
  export default TaskItem;