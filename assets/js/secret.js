console.log('hello');
$(document).ready(function () {

  // ==================== GET ALL TASKS ==================== //
  fetch('/tasks')
    .then(res => res.json())
    .then(data => {
      const ol = document.querySelector('.actualList');

      data.forEach((dataObj, index) => {
        let li = document.createElement('li');
        let span = document.createElement('span');
        let buttonUpdate = document.createElement('button');
        let buttonDelete = document.createElement('button');
        let modalDiv = document.createElement('div');
        let modalContent = document.createElement('div');
        let modalClose = document.createElement('span');
        let modalLabel = document.createElement('label');
        let modalInput = document.createElement('input');
        let modalButton = document.createElement('button');
        let modalForm = document.createElement('form');

        // buttonUpdate.onclick = () => { modalDiv.style.display = "block" };

        modalDiv.className = 'modal';
        modalDiv.id = "modal" + index;
        modalContent.className = 'modalContent';
        modalContent.className = 'animate-zoom';
        modalContent.id = "modalContent" + index;
        modalClose.className = 'modalClose';
        modalClose.id = "modalClose" + index;
        modalClose.innerHTML = "&times;"
        modalClose.onclick = () => { modalDiv.style.display = "none" };
        modalButton.className = 'modalButton';
        modalButton.id = "modalButton" + index;
        modalButton.setAttribute('type', 'submit')
        // modalButton.onclick = () => { modalDiv.style.display = "none" };

        modalButton.innerHTML = "Update List Item";
        modalInput.className = 'modalInput';
        modalInput.id = "modalInput" + index;
        modalInput.setAttribute('type', 'text');
        modalInput.setAttribute('placeholder', 'Enter New List Item');
        modalLabel.className = 'modalLabel';
        modalLabel.id = "modalLabel" + index;
        modalLabel.innerText = "Update List Item";
        modalForm.className = 'modalForm';
        modalForm.id = "modalForm" + index;

        buttonUpdate.className = 'buttonUpdate';
        buttonDelete.className = 'buttonDelete';
        buttonUpdate.id = "buttonUpdate" + index;

        buttonDelete.id = "buttonDelete" + index;
        buttonUpdate.innerHTML = 'update';
        buttonDelete.innerHTML = 'delete';
        li.innerHTML = dataObj.title
        li.id = "list" + index;

        modalForm.append(modalLabel);
        modalForm.append(modalInput);
        modalForm.append(modalButton);

        modalContent.append(modalClose);
        modalDiv.append(modalContent);
        modalDiv.append(modalForm);
        buttonUpdate.append(modalDiv);

        span.append(buttonUpdate);
        span.append(buttonDelete);
        li.append(span);
        ol.append(li);
      })
    })
    .catch(err => {
      console.log('list.js get request error: ', err)
    })


})