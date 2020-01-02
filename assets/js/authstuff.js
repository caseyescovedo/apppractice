// let submit = document.getElementById('submit');
// submit.addEventListener('click',()=>{
//         let user = document.getElementById('user');
//         let pass = document.getElementById('pass');
//         console.log(user);
//         fetch('/verify',{
//             headers:{
//                 'Content-Type':'application/json'
//               },
//               method:'POST',
//               body:JSON.stringify({username:user.value,password:pass.value})
//         })
//         .then(res =>{res.json()})
//         .then(data =>{
//             window.alert(data);
//         })
// })