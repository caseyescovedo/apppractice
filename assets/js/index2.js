let change = document.getElementById('submit');

change.addEventListener('click', function(e){
    e.preventDefault();
    console.log(document.getElementById('user').value == 'codesmith' && document.getElementById('pass').value == 'ilovetesting');
    if(document.getElementById('user').value == 'codesmith' && document.getElementById('pass').value == 'ilovetesting'){
        console.log('here');
        window.location = "secret";
        return;
    }
    else{
        let div = document.createElement("div");
        div.innerText = "unsuccessful login attempt";
        document.body.appendChild(div);
    }
})