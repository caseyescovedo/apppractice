import styles from '../css/style.css';
import { builtinModules } from 'module';

const newTask = (task) => {
    console.log('in newTask');
    fetch('/task', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            task: task
        })
    })
    .then((res) => {
        
        return res.json();
    })
};
        

let task = document.getElementById("task");

document.getElementById("task-button").onclick = function newTask(task);

const getTasks = () => {
    fetch('/task', {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html',
        }
    })
    .then((res) => {
        let tasks = res.json();
        return tasks
    })
    return tasks
}

document.getElementById("retrieve").onclick = function getTasks();

const deleteTask = (id) => {
    fetch('/task', id, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            id: id
        }
    });
    .then((res) => {
        return res.json();
    })
}

module.exports = {
    newTask,
    getTasks, 
    deleteTask
}