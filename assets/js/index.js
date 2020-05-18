

window.onload = function() {
  console.log("Loading HTML !!!");

  const ul = document.getElementsByTagName("ul");
  const firstUL = ul[0]

  fetch('http://localhost:3333/getTasks')
  .then((resp) => resp.json())
  .then(function(data) {
    console.log(data);
    return data.map(function(currData) {
      let li = document.createElement('li');

      li.innerHTML = currData.item;
      li.setAttribute("id", currData._id);
      li.classList.add("task");
      let deleteButton = document.createElement('button');
      deleteButton.innerHTML = "X"
      li.append(deleteButton);
      firstUL.append(li);
    })
  })
  .catch(function(error) {
    console.log(error);
  });   



    var addTaskButton = document.querySelector("#task-button");

    addTaskButton.onclick = function() {
        console.log('add Task Button clicked')   
        let data = {}
        let item = document.getElementsByTagName("input")[0].value;
        data.item = item;
        fetch('http://localhost:3333/postTask', {
          method: 'POST',
          headers: {
           'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        .then((resp) => resp.json())
        .then(function(data) {
          console.log(data);
          const ul = document.getElementsByTagName("ul");
          const firstUL = ul[0]
            let li = document.createElement('li');
             li.innerHTML = data.item;
             li.setAttribute("id", data._id);
             li.classList.add("task");
             let deleteButton = document.createElement('button');
             deleteButton.innerHTML = "X"
             li.append(deleteButton);
            firstUL.append(li);
        })
        .catch(function(error) {
          console.log(error);
        });  
    };




    // var deleteTaskButton = document.querySelector("#task-button");
}