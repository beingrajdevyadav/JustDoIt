import { useState } from 'react'

import './App.css'

function App() {
  // to get and store saved tasks
  const [tasks, setTasks] = useState(()=>{
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];

    
  })
  return (
    <>
      <h1>Just Do It</h1>
    </>
  )
}

export default App
