const button = document.getElementById('retrieve');
button.addEventListener('click', () => {
    const elements = document.getElementsByTagName('li')
    if(elements){
        while (elements[0]) elements[0].parentNode.removeChild(elements[0])
    }
    fetch('/getTasks')
    .then(res => res.json())
    .then(data => {
    let taskList = document.getElementById('task-list');
    data.map(item => {
        let text = item.item;
        let task = document.createElement('li');
        task.innerText = text;
        let removeButton = document.createElement('button');
        removeButton.setAttribute('class', 'remove')
        removeButton.innerText ='X';

        //trying to imitate sending a get request to the server and loading the results after deleting an item
        //but theres an async issue happening where its requesting the the data before deleting the item 
        //item IS deleted from database so if you click Get Tasks after clicking on the X button, it will show without the recently deleted item
        function myFunction() {
            document.getElementById("retrieve").click();
          }
        
        removeButton.addEventListener('click', () => {
            fetch('/removeTask', {
                method: 'DELETE',
                body: JSON.stringify({item : text}),
                headers: {'Content-Type': 'application/json'},
            })
            .then(res => console.log('deleting'), ()=> myFunction())
        })

        task.appendChild(removeButton)
        taskList.appendChild(task);
    })
    })
    .catch(e => console.log('error in setting up secrets items', e))
    
 
});



const addButton = document.getElementById('task-button');
addButton.addEventListener('click', () => {
    const textbox = document.querySelector('#task');
    const text = textbox.value;
    fetch('/postTask', {
        method: 'POST',
        body: JSON.stringify({item : text}),
        headers: {
            'Content-Type': 'application/json'
          }
    })
    textbox.value = ''
})


//trying to send username/password to back end. Set up seems right to me, but for some reason im not getting anything in my req/body
const signIn = document.getElementById('submit');
signIn.addEventListener('click', () => {
    const userBox = document.querySelector('#user');
    const passBox = document.querySelector('#pass');
    const userText = userBox.value;
    const passText = passBox.value;
    fetch('/signin', {
        method: 'POST',
        body: JSON.stringify({
            username : userText,
            password: passText
        }),
        headers: {
            'Content-Type': 'application/json'
          }
    })
})




