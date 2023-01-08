import React, { useState } from "react";

const Controls = ({ stages, tasks, setTasks }) => {
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState("");

  const [movebackButtonDisabled, setMovebackButtonDisabled] = useState(true);
  const [moveforwardButtonDisabled, setMoveforwardButtonDisabled] =
    useState(true);
  const [deleteButtonDisabled, setDeleteButtonDisabled] = useState(true);

  const handleAddTask = () => {
    /*
    myMap.set() updates the map and setMyMap sets the state 
    and tells React to re-render the component. 
    Except that in this case, React doesn’t trigger a render. 
    React does a comparison of new state and old state and in this case, 
    it compares the references of new Map to old Map which share the same value. 
    So, React bails out without triggering an update.
    What we need to pass to setMyMap is a clone of the map instead of a 
    copy of the reference. 
    A simple change to the setMyMap will do the trick
    */
    let allValues = [];
    for (let task of tasks.values()) {
      allValues.push(...task);
    }
    if (allValues.includes(newTask)) {
      alert("task already exist, please create another");
    } else {
      setTasks(
        new Map(tasks.set("Backlog", [...tasks.get("Backlog"), newTask]))
      );
      setNewTask("");
    }
  };

  // this checks the selected task upon entering into input box and change the buttons accordingly
  const handleSelectedTask = (e) => {
    setMovebackButtonDisabled(true);
    setMoveforwardButtonDisabled(true);
    setDeleteButtonDisabled(true);
    setSelectedTask(e.target.value);
    for (let stage of stages) {
      if (tasks.get(stage).includes(e.target.value)) {
        switch (stage) {
          case "Backlog":
            setMoveforwardButtonDisabled(false);
            setDeleteButtonDisabled(false);
            break;
          case "Done":
            setMovebackButtonDisabled(false);
            setDeleteButtonDisabled(false);
            break;
          default:
            setMovebackButtonDisabled(false);
            setMoveforwardButtonDisabled(false);
            setDeleteButtonDisabled(false);
        }
      }
    }
  };

  // this handles the actions and also does recheck of the buttons accordingly
  const handleActionButton = (e) => {
    let stageInFocus;
    let newTasksList;
    let prevStage;
    let nextStage;
    for (let stage of stages) {
      if (tasks.get(stage).includes(selectedTask)) {
        stageInFocus = stage;
        prevStage = stages[stages.indexOf(stage) - 1];
        nextStage = stages[stages.indexOf(stage) + 1];
      }
    }

    switch (e.target.value) {
      case "Move Back":
        newTasksList = tasks
          .get(stageInFocus)
          .filter((item) => item !== selectedTask);
        setTasks(new Map(tasks.set(stageInFocus, newTasksList)));
        setTasks(
          new Map(tasks.set(prevStage, [...tasks.get(prevStage), selectedTask]))
        );
        if (prevStage === "Backlog") {
          setMovebackButtonDisabled(true);
          setMoveforwardButtonDisabled(false);
          setDeleteButtonDisabled(false);
        } else {
          setMovebackButtonDisabled(false);
          setMoveforwardButtonDisabled(false);
          setDeleteButtonDisabled(false);
        }
        break;
      case "Move Forward":
        // code block

        newTasksList = tasks
          .get(stageInFocus)
          .filter((item) => item !== selectedTask);
        setTasks(new Map(tasks.set(stageInFocus, newTasksList)));
        setTasks(
          new Map(tasks.set(nextStage, [...tasks.get(nextStage), selectedTask]))
        );
        if (stages[stages.indexOf(stageInFocus) + 1] === "Done") {
          setMovebackButtonDisabled(false);
          setMoveforwardButtonDisabled(true);
          setDeleteButtonDisabled(false);
        } else {
          setMovebackButtonDisabled(false);
          setMoveforwardButtonDisabled(false);
          setDeleteButtonDisabled(false);
        }
        break;
      case "Delete":
        // code block
        newTasksList = tasks
          .get(stageInFocus)
          .filter((item) => item !== selectedTask);
        setTasks(new Map(tasks.set(stageInFocus, newTasksList)));
        setSelectedTask("");
        break;
      default:
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <div>Controls</div>
      <div>
        <input
          placeholder="New Task Name"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={() => handleAddTask()}>Create Task</button>
      </div>
      <div>
        <input
          placeholder="Select Task"
          value={selectedTask}
          onChange={handleSelectedTask}
        />
        <button
          value="Move Back"
          onClick={(e) => handleActionButton(e)}
          disabled={movebackButtonDisabled}
        >
          Move Back
        </button>
        <button
          value="Move Forward"
          onClick={(e) => handleActionButton(e)}
          disabled={moveforwardButtonDisabled}
        >
          Move Forward
        </button>
        <button
          value="Delete"
          onClick={(e) => handleActionButton(e)}
          disabled={deleteButtonDisabled}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Controls;
