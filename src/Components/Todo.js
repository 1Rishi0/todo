import React, { useEffect, useRef, useState } from "react";
import './Todo.css';
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "./loginReducer";

const Todo = ()=>{

    const username = useSelector((state)=> state.login.user);

    const [tasks , setTasks] = useState([]);
    const taskInputRef = useRef(null);
    
    const addTask = (event)=>{
        event.preventDefault();
        const taskText = taskInputRef.current.value.trim();
        if(taskText!==""){
            setTasks((prevTasks) => [...prevTasks, taskText]);
            taskInputRef.current.value="";
        }
        console.log("Tasks are ", tasks);
    };

    const toggleTask =(index) =>{
        setTasks((prevTasks) => {
            const updatedTasks= [...prevTasks];
            updatedTasks.splice(index,1);
            return updatedTasks;
        })
    }

    const saveTasks = async()=>{
        try{
            await axios.post("http://localhost:4000/addTask", {
                username,
                tasks,
            });
            console.log("Task saved successfullly");
        }
        catch(error){
            console.error("Error in saving the file");
        }   
    }

    useEffect (() => {
        const fetchTasks = async () => {
            try{
                console.log(username);
                const response = await axios.post('http://localhost:4000/getTasks', {username});
                console.log("Response is", response); 
                setTasks (response.data);
            }
            catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
        }, [username]);

    return(
        <div className="container">
            <h1>Todo List</h1>
            <div className="input-container">
                <input type="text" placeholder="TASKS" className="task-input" ref={taskInputRef}/>
                <button className="add-button" onClick={addTask}>
                    ADD
                </button>
            </div>
            <ul className="task-list" id="tasklist">
                {tasks.map((task, index) => (
                    <li key={index}>
                        <input type="checkbox" className="task-checkbox" onChange={()=> toggleTask(index)}  />
                        <span className="task-text">{task}</span>
                    </li>
                ))}
            </ul>
            <div >
                <button className="uploadbtn" onClick={saveTasks}>SAVE</button>
            </div>
        </div>
    )
}


export default Todo;