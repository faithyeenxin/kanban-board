import React from "react";
import Task from "./Task";

const Stage = ({ stage, tasks }) => {
  return (
    <div style={{ width: "25%", height: "50%" }}>
      <div style={{ fontSize: "40px" }}>{stage}</div>
      {tasks.get(stage).map((taskname, idx) => (
        <Task key={idx} taskName={taskname} />
      ))}
    </div>
  );
};

export default Stage;
