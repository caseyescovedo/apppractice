const path = require("path");
const db0 = require( path.join("..", "models", "TaskModel") );
function t_get( req, res, next )
{
	console.log("[info t_ctrl.t_get] entered");
	db0.query( "SELECT * FROM TASK" )
	.then( rslt =>
		res.status(200).json(rslt.rows)
	);
}
function t_post( req, res, next )
{
}
module.exports = { "t_get": t_get, "t_post": t_post };
