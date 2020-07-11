const controller = {};

// Check for user of codesmith and a pass of ilovetesting.
// Providing these credentials will redirect to the secret page route
// Any other credentials (or none at all) will send the string 'unsuccessful login attempt'
// Providing the correct login credentials should set a cookie on the client
// with a key of token and a value of admin
// Visiting the http://localhost:3333/secret route directly should now check for the valid cookie
// before sending the secret page. If the cookie is not valid (or does not exist), send back the string
// You must be signed in to view this page

module.exports = controller;
