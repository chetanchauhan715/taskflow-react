import { useState } from 'react'
import './App.css';
import TaskList from './components/TaskList/TaskList'

function App() {
  const [input , setInput] = useState("");
  const [tasks , setTasks] = useState([]);

  function addTask(event){
    event.preventDefault();
    if(input.trim() === ""){
      alert("Please enter valid task ")
      return;
    }

    const newTask = {
      id:Date.now(),
      text:input ,
      completed:false
    }
   
  
    setTasks( (prevTasks) => [...prevTasks , newTask]);
    // console.log(tasks);

    setInput("");
    
  }

  function deleteTask(id){
    setTasks( (prevTasks)=> (
      prevTasks.filter( (task) => task.id !== id)
    ));
  }

  function toggleTask(id){
    setTasks( (prevTasks) =>
  prevTasks.map((task)=>
task.id === id 
? {
  ...task , completed : !task.completed
} : task

));
  
  }

  

  return (
    <>
      <div className='main-container'>
        <h1>TaskFlow</h1>

        <form onSubmit={addTask} >
          <label > 
            Task
            </label>

            <input 
            type="text"
            value={input}
            placeholder="Enter Your Task Here .."
            onChange={ (e)=> setInput(e.target.value)}
            />
          

          <button type='submit'>Add</button>
        </form>

        <TaskList
         tasks={tasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        />

      </div>
    </>
  )
}

export default App
