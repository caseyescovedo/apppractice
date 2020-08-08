// [3:10pm] I still adapt the previous assessment
//	to this one. Possibly this way, there will remain
//	more time to complete the remaining parts
window.addEventListener( "load", on_load );
let btn_get, btn_post, list;
const URL = "http://localhost:3333";

function on_load()
{
	btn_get = document.querySelector("#retrieve");
	btn_post = document.querySelector("#task-button");
	list = document.querySelector("#task-list");
	
	btn_get.addEventListener("click", t_get);
	btn_post.addEventListener("click", t_post);
}
// [3:55pm] tested round path to local server
// [4:20pm] tested round path to database
function t_get()
{
	fetch( URL + "/tasks",
		{headers: {"Content-Type": "application/json"}}
	).then( rslt => rslt.json() )
	.then( rslt => console.log(rslt) )
	.then( list_render );
}
// [4:20pm] begin to write list_render()
//	I will adapt it from the last version that I
//	completed of the previous assessment
function list_render()
{
	for (let task of tasks) {
		let li =  document.createElement( "li" );
		let btn = document.createElement( "btn" );
		li.innerText = task.item;
// ***** [4:26PM] RECEIVED MESSAGE - TO CREATE PR ******

}
function t_post()
{
}
