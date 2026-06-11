import { useState , useEffect } from 'react'
import './App.css';
import TaskList from './components/TaskList/TaskList'

function App() {
  const [input , setInput] = useState("");

  const [tasks , setTasks] = useState( () => {
    const savedTasks = localStorage.getItem("tasks");

    if(savedTasks){
      return JSON.parse(savedTasks);
    }

    return [];
  });

  useEffect( () => {
    localStorage.setItem(
      "tasks", 
      JSON.stringify(tasks)
    ) ;
  } , [tasks]);

  const [editId , setEditId] = useState(null);
  const [search , setSearch] = useState("");
  const [priority , setPriority] = useState("low");
  const [status , setStatus] = useState("all");


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
  // const filteredTask = tasks.filter( (task)=> 
  //   task.text.toLowerCase().includes(search.toLowerCase())
  // );


//   console.log(tasks);
// console.log(status);
// console.log(search);



  const filteredTask = tasks.filter( (task) => { 

    // console.log("Current Task:", task);
   
    const matchesSearch = task.text.toLowerCase().includes(search.toLowerCase());

    console.log("matchesSearch:", matchesSearch);

    let matchesStatus;

    if(status === "all"){
      matchesStatus = true;
    } else if (status === "completed"){
      matchesStatus = task.completed === true ;
    } else if(status === "pending"){
      matchesStatus = task.completed === false;
    }

   
    // console.log("matchesStatus:", matchesStatus);


    return matchesStatus && matchesSearch;

  })


  const priorityValue = {
    low:1,
    medium:2,
    high:3
  } ;

  const sortedTasks = [...filteredTask];

  sortedTasks.sort( (a, b) => 
priorityValue[b.priority ] - priorityValue[a.priority]
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

          <select
          value={status}
          onChange={ (e)=> setStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>

          </select>

        </form>

        <TaskList
         tasks={sortedTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
        editTask={editTask}
        />

      </div>
    </>
  )
}


export default App
