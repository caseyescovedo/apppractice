

document.addEventListener('DOMContentLoaded', () => {

  const getTasks = document.querySelector('#retrieve');

  getTasks.addEventListener('click', e => {
    console.log('clicked');

    fetch('/tasks', {
      method: 'GET'
    })
      .then((response) => {
        // console.log(response.body) // ReadableStream
        return response.json()
      })
      .then((res) => {
        // console.log(res.locals)
        // console.log(res.body) // type error; res undefined

        console.log(res)
      })
  })
  // response.rows[0].item

  // console.log('response.rows[0].item:', response.rows[0].item);
  // console.log('response.rows[0].created_at:', response.rows[0].created_at);
  // console.log('response.rows[1].item:', response.rows[1].item);

});
