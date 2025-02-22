import { useEffect, useState } from 'react'

import './App.css'

function App() {
  // to get and store saved tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];

    // to get and hold input field value
    const [task, setTask] = useState("");

    // to store tasks list in localStorage() after each task updation
    useEffect(() => {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);


    // function to add task
    const addTask = ()=>{
      if(task.trim() !== ""){
        setTasks([...tasks, {
        completed:false, 
        text: task, 
        id: Date.now()
        }
      ]);

        setTask("");
      }
    };


    // toggle task function
    const toggleTask = (index)=>{
      const newTasks = tasks.map((t,i)=> i === index ? {...t, completed: !t.completed} : t);
      setTasks(newTasks);
    }
  })
  return (
    <>
      <h1>Just Do It</h1>
    </>
  )
}

export default App
