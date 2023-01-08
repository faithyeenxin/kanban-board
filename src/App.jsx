import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Board from "./components/Board";
import Controls from "./components/Controls";
// import './App.css'

function App() {
  const stages = ["Backlog", "To Do", "Ongoing", "Done"];
  const [tasks, setTasks] = useState(
    new Map([
      ["Backlog", ["task 0", "task 1", "task 2", "task 3"]],
      ["To Do", ["task 4", "task 5", "task 6"]],
      ["Ongoing", ["task 7", "task 8"]],
      ["Done", ["task 9"]],
    ])
  );

  return (
    <div className="App">
      <div style={{ fontSize: "80px" }}> Kanban Board</div>
      <Controls stages={stages} tasks={tasks} setTasks={setTasks} />
      <Board stages={stages} tasks={tasks} />
    </div>
  );
}

export default App;
