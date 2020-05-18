window.onclick = () => {
    // for taks button. 
    let updateBtn = document.getElementById('task-button');
    updateBtn.addEventListener('click', () => {
        let item = document.getElementById('task').value; // you need to get the VALUE of it  

        if (item) {
            fetch('/secret', {
                method: 'POST',
                body: json.stringfy({item})
            })
            .then(reponse => console.log('here is the response ***', response)) // semicolons will give you errors, don't put them in a then
            .catch((err) => console.log('here is the error ****' , err));
        }
    })
    
    let getButton = document.getElementById('retrieve');
    let task = document.getElementById('task-list');

    getButton.addEventListener('click', () => {
        fetch('/getSecret')
        .then(response => response.json())
        .then(data => {
            data.forEach(dataElements => {
                const list = document.createElement('li');
                const button = document.createElement('button');

                list.innerHTML = dataElements.item;

                button.className = 'remove';
                button.innerHTML = 'X';
                task.appendChild(list).appendChild(button);

            })
        })
    })
}