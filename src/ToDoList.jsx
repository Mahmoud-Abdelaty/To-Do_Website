import React, { useState } from "react";
import "./ToDoList.css";

export default function ToDoList() {
  const [task, setTask] = useState("");
  const [todosList, settodoList] = useState([]);
  const [indexTaskEdit, setEditedTask] = useState(null);
  const [error, setError] = useState(null);

  //  Take Value from input save in Task
  const setTaskChange = (e) => {
    setTask(e.target.value);
  };

  const addTask = () => {
    if (task.trim() !== "") {
      if (indexTaskEdit !== null) {
        const updatedList = [...todosList];
        updatedList[indexTaskEdit] = task;
        settodoList(updatedList);
        setEditedTask(null);
      } else {
        settodoList([...todosList, task]);
      }
      setTask("");
      setError(null);
    } else {
      setError("*Please Enter your Task");
    }
  };


  const deleteTask = (index) => {
    const todoListNew = [...todosList];
    todoListNew.splice(index, 1);
    settodoList(todoListNew);
  };

  const editTask = (index) => {
    setTask(todosList[index]);
    setEditedTask(index);
  };

  return (
    <>
      <h1>ToDo List</h1>
      <div className="container">
        <input
          className="task-input" 
          placeholder="Enter Your Task"
          value={task}
          onChange={setTaskChange}
        ></input>
        <button className="add-edit-button" onClick={addTask}>
          {indexTaskEdit !== null ? "Done" : "Add"}
        </button>
        {task.trim() === "" ? <span>{error}</span> : null}
      </div>
      <table className="user-table">
        <tr>
          <th>Task</th>
          <th>Delete</th>
          <th>Edit</th>
        </tr>
        {todosList.map((e, index) => (
          <tr key={index} className={index % 2 === 0 ? "even" : "odd"}>
            <td>{e}</td>
            <td>
              <button
                className="delete-button"
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
            </td>
            <td>
              {indexTaskEdit !== null && indexTaskEdit === index ? null : (
                <button className="edit-button" onClick={() => editTask(index)}>
                  Edit
                </button>
              )}
            </td>
          </tr>
        ))}
      </table>
    </>
  );
}
