import { useState } from 'react'
import './App.css';
import TaskList from './components/TaskList/TaskList'

function App() {
  const [input , setInput] = useState("");
  const [tasks , setTasks] = useState([]);
  const [editId , setEditId] = useState(null);
  const [search , setSearch] = useState("");
  const [priority , setPriority] = useState("low");


  function addTask(event){
    event.preventDefault();
    if(input.trim() === ""){
      alert("Please enter valid task ")
      return;
    }

    if(editId !== null){
      setTasks( (prevTasks) =>
    prevTasks.map( (task) =>
  task.id === editId
? {
  ...task, text:input
}
:
task)) ;
setEditId(null);
setInput("");
    } 

    else {

    const newTask = {
      id:Date.now(),
      text:input ,
      completed:false,
      priority:priority
    }
   
  
    setTasks( (prevTasks) => [...prevTasks , newTask]);
    // console.log(tasks);

    setInput("");
    setPriority("low");
    
  }
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

  function editTask(task){
    setInput(task.text);
    setEditId(task.id);
  }

// filtered task - seperate for search and filter (chunk of tasks used for ui ) without modifying original
  const filteredTask = tasks.filter( (task)=> 
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  // form -------------------------

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

            <select 
            value={priority}
            onChange={ (e)=> setPriority(e.target.value)}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>

            </select>
          

          <button type='submit'>
            {
              editId !== null ? "save" : "add"
            }
          </button>

          <input 
          type="text" 
          placeholder="search tasks.."
          value={search}
          onChange={ (e)=> setSearch(e.target.value)}
          />
        </form>

        <TaskList
         tasks={filteredTask}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
        />

      </div>
    </>
  )
}


export default App
