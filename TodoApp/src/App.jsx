import { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend } from "chart.js";

import './App.css'


ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);


function App() {
  // to get and store saved tasks
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  })

  // to get and hold input field value
  const [task, setTask] = useState("");

  // to hold editing task index
  const [editingIndex, setEditingIndex] = useState(null);



  // to store tasks list in localStorage() after each task updation
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // check successful insertion of task
    // console.log(tasks);
  }, [tasks]);


  // function to add task
  const addTask = () => {
    if (task.trim() !== "") {
      if (editingIndex !== null) {
        const updatedTasks = tasks.map((t, i) => (i === editingIndex ? { ...t, text: task } : t));

        setTasks(updatedTasks);
        setEditingIndex(null);
      } else {
        setTasks([...tasks, {
          completed: false,
          text: task,
          id: Date.now()
        }
        ]);
      }

      setTask("");

    }
  };


  // functions to edit task
  const editTask = (index) => {
    setTask(tasks[index].text);
    setEditingIndex(index);
  }


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


  // to identify complete and pending tasks
  const completedTasks = tasks.filter(t => t.completed).length;
  const pendingTasks = tasks.filter(t => !t.completed).length;
  const progress = tasks.length ? (completedTasks / tasks.length) * 100 : 0;



  // doughnut chart data
  const doughnutChartData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completedTasks, pendingTasks],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };


  return (
    <>
      {/* header  */}
      <header>
        <h2>JustDoIt</h2>

      </header>

      <main>

        <div className="todo-app-container">
          {/*  form  */}
          <div className="form">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder='Add a task here '
            />

            <button onClick={addTask}> {editingIndex !== null ? "Update" : "Add Task"}</button>
          </div>

          {/* todo list container  */}
          <div className="task-list">
            <hr />
            {
              tasks.map((t, index) => (
                <div className="task" key={t.id}>
                  <p>{t.text}</p>
                  <div className="task-controls">
                    <button onClick={() => { editTask(index) }}>Edit</button>
                    <button onClick={() => { toggleTask(index) }}>Done</button>
                    <button onClick={() => { deleteTask(index) }}>Delete</button>
                  </div>

                </div>

              ))
            }
          </div>
        </div>

        <div className="chart-container">
          <h2> <hr /> Today Target <hr /> </h2>

          <div className="chart">
            <Doughnut data={doughnutChartData} />
          </div>


          <h2> <hr />  Progress : {Math.floor(progress)}%  <hr /></h2>

        </div>
      </main>


      {/* footer  */}

      <footer>
        <p>Just Do It By Rajdev Yadav </p>
      </footer>
    </>
  )
}

export default App
