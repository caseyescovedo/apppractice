$(docuemnt).ready(function () {
  //wirte some stuff here
  const rapper = document.getElementById("create");
  rapper.addEventListener("click", (event) => {
      //prevernt multple clicks
      event.preventDefault();
    if (event.target.id === "retreive") {
      fetch("/api")
        .then((res) => res.json())
        .then((data) => {
          const ul = document.querySelector("task-list");

          //hopefully if the data work then we should able to get the array or objects,
          //of item in here
          data.forEach((element, index) => {
            //question is can you put div around ul???????
            let div = document.createElement("div");
            div.setAttribute("class", "div" + index);
            ul.append(div);

            let li = docuemnt.createElement("li");
            //whatever the key name is for item, imma put item for now /:
            li.setAttribute("id", "list" + index);
            li.innerHTML = data.item;

            div.append(li);

            let buttonDelete = document.createElement("button");
            //giving each button a unique id, not sure if i cam add the index with the strings or jstu pass in the id hmmmmmmmm moooo
            buttonDelete.setAttribute("class", "remove" + index);
            buttonDelete.innerText = "X";
            div.append(buttonDelete);


         
          });
        });
    }
  });

  //if the delete button was clicked 

  document.addEventListener('click', function (event){
 //prevent multiple clicks , make sure its invoked otherwise it wont work ah
 event.preventDefault()
})
};
