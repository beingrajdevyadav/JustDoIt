import { useEffect, useState } from 'react'

import './App.css'

function App() {
  // to get and store saved tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })

  // to get and hold input field value
  const [task, setTask] = useState("");

  // to store tasks list in localStorage() after each task updation
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // check successful insertion of task
    console.log(tasks);
  }, [tasks]);


  // function to add task
  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, {
        completed: false,
        text: task,
        id: Date.now()
      }
      ]);

      setTask("");
    }

    
  };


  // toggle task function
  const toggleTask = (index) => {
    const newTasks = tasks.map((t, i) => i === index ? { ...t, completed: !t.completed } : t);
    setTasks(newTasks);
  }


  // to delete task function
  const deleteTask = (index) => {
    const remainedTasks = tasks.filter((t, i) => i !== index);
    setTasks(remainedTasks);
  }




  return (
    <>
      {/* header  */}
      <header>
        <h1>Just Do It</h1>
      </header>

      {/*  form  */}
      <div className="form">
        <input 
        type="text" 
        value={task} 
        onChange={(e) => setTask(e.target.value)}
        placeholder='Add a task here '
        />

        <button onClick={addTask}>Add Task</button>
      </div>

{/* todo list container  */}
<div className="task-list">
  {
    tasks.map((t, index)=>(
<div className="task" key={t.id}>
  <h3>{t.text}</h3>
  <button onClick={()=>{deleteTask(index)}}>Delete</button>
  <button onClick={()=>{toggleTask(index)}}>Done</button>
</div>

    ))
  }


</div>

      {/* footer  */}
      <footer>
        <p>Just Do It By Rajdev Yadav </p>
      </footer>
    </>
  )
}

export default App
