import React from "react";
import Stage from "./Stage";
import Task from "./Task";

const Board = ({ stages, tasks }) => {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "#D3D3D3",
        width: "100vw",
        height: "50vh",
      }}
    >
      {stages.map((stage, idx) => {
        return <Stage key={idx} stage={stage} tasks={tasks} />;
      })}
    </div>
  );
};

export default Board;
