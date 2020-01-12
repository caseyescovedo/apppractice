console.log("index.js is running!");

window.onload = function() {
  const getButton = document.getElementById("retrieve");
  getButton.addEventListener("click", getTasks);

  const taskButton = document.getElementById("task-button");
  taskButton.addEventListener("click", postTask);

  //   for (let i = 0; i < removeButton.length; i++) {
  //     removeButton[i].addEventListener('click', deleteTask, false);
  // }
  // removeButton.addEventListener("click", (e) => deleteTask(e));

  function getTasks() {
    console.log("Retrieving tasks from database");
    fetch("/api/")
      .then(res => res.json())
      .then(tasks => {
        console.log(tasks);
        const list = document.getElementById("task-list");
        // Get the <ul> element with id="myList"
        while (list.firstChild) {
          list.removeChild(list.firstChild);
        }
        for (let i = 0; i < tasks.length; i++) {
          const node = document.createElement("LI");
          const button = document.createElement("button");
          button.className = "remove";
          const textnode = document.createTextNode(tasks[i].item);
          buttonNode = document.createTextNode("X");
          node.appendChild(textnode);
          button.appendChild(buttonNode);
          list.appendChild(node);
          node.appendChild(button);
        }
        const removeButton = document.getElementsByClassName("remove");

        console.log(removeButton);
        Array.from(removeButton).forEach(function(element) {
          element.addEventListener("click", deleteTask);
        });
      });
  }
  function postTask() {
    console.log(
      "posting task to database",
      document.getElementById("task").value
    );
    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ item: document.getElementById("task").value })
    })
      .then(response => response.json())
      .then(data => {
        console.log("Success:", data);
        const list = document.getElementById("task-list");
        const node = document.createElement("LI");
        const button = document.createElement("button");
        button.className = "remove";
        const textnode = document.createTextNode(data.item);
        buttonNode = document.createTextNode("X");
        node.appendChild(textnode);
        button.appendChild(buttonNode);
        list.appendChild(node);
        node.appendChild(button);
      })
      .catch(error => {
        console.error("Error:", error);
      });
    const removeButton = document.getElementsByClassName("remove");

    console.log(removeButton);
    Array.from(removeButton).forEach(function(e) {
      e.addEventListener("click", (e) => deleteTask(e));
    });
  }


  //INCOMPLETE - 10 MINUTES LEFT // still trying to figure out how to get click event from these buttons...
  function deleteTask(e) {
    console.log("Deleting task from database", e);

    /*

here is the event object - doesn't seem to have any indictaor of position (??)
click
​
altKey: false
​
bubbles: true
​
button: 0
​
buttons: 0
​
cancelBubble: false
​
cancelable: true
​
clientX: 1017
​
clientY: 267
​
composed: true
​
ctrlKey: false
​
currentTarget: null
​
defaultPrevented: false
​
detail: 1
​
eventPhase: 0
​
explicitOriginalTarget: <button class="remove">
​
isTrusted: true
​
layerX: 1017
​
layerY: 267
​
metaKey: false
​
movementX: 0
​
movementY: 0
​
mozInputSource: 1
​
mozPressure: 0
​
offsetX: 0
​
offsetY: 0
​
originalTarget: <button class="remove">
​
pageX: 1017
​
pageY: 267
​
rangeOffset: 0
​
rangeParent: null
​
region: ""
​
relatedTarget: null
​
returnValue: true
​
screenX: 1017
​
screenY: 405
​
shiftKey: false
​
srcElement: <button class="remove">​
target: <button class="remove">
​
timeStamp: 3725
​
type: "click"
​
view: Window http://localhost:3333/secret
​
which: 1
​
x: 1017
​
y: 267






    */


    // fetch("/api/")
    //   .then(res => res.json())
    //   .then(tasks => {
    //     console.log(tasks);
    //     const list = document.getElementById("task-list");
    //     // Get the <ul> element with id="myList"
    //     while (list.firstChild) {
    //       list.removeChild(list.firstChild);
    //     }
    //     for (let i = 0; i < tasks.length; i++) {
    //       const node = document.createElement("LI");
    //       const button = document.createElement("button");
    //       button.className = "remove";
    //       const textnode = document.createTextNode(tasks[i].item);
    //       buttonNode = document.createTextNode("X");
    //       node.appendChild(textnode);
    //       button.appendChild(buttonNode);
    //       list.appendChild(node);
    //       node.appendChild(button);
    //     }
    //   });
  }
};
