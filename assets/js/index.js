
// could not get the delete button functional 
const getAll = document.getElementById('retrieve')
getAll.addEventListener('click', () => {
    while(list.firstChild) list.removeChild(list.firstChild);
    fetch('/data')
    .then((response)=> response.json())
    .then((data)=> {
        data.forEach(item => {
            listBuild(item)
        });
    })
    .catch(err => console.log(err))} 
)

const list = document.getElementById('task-list')

function listBuild (item) {
    const line = document.createElement('Li')
    line.append(item.item) 
    line.id = item._id
    const del = document.createElement('button')
    del.innerHTML = 'X'
    del.className = 'remove'
    // cant get this request to work
    del.addEventListener('click',() => { 
        fetch(`/data/${item._id}`)
        .then(() => {console.log('deleted'); 
        list.remove(line)})
        .catch(err => console.log(err))
    } )
    line.appendChild(del)
    list.appendChild(line)
}

console.log('hi')


const add = document.getElementById('task-button')
const text = document.getElementById('task')

add.addEventListener('click', () => {
    const body = {
        "item": text.value,
        "created_at" : Number.toString(Date.now())
    }
    fetch('/data', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(body)
    })
    .then((response)=> response.json())
    .then((data)=> {
        console.log(data);
        listBuild(data)
    })
    .catch(err => console.log(err))} 
)
