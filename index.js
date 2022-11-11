const form = document.getElementById('form');
const textInput = document.getElementById('textInput');
const dateInput = document.getElementById('dateInput');
const textArea = document.getElementById('textarea');
const tasks = document.getElementById('tasks');
const msg = document.getElementById('msg');
const add = document.getElementById('add');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
})

const formValidation = () => {
  if(textInput.value === ''){
    msg.innerHTML = 'Task cannot be empty';
    console.log('failure');
  }
  else{
    console.log('sucess');
    msg.innerHTML = '';
    acceptData();
    add.setAttribute('data-bs-dismiss', 'modal');
    add.click();
    (() => {
      add.setAttribute('data-bs-dismiss', '');
    })();
  }
};

let data = [];

const acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    Description: textArea.value,
  });
  localStorage.setItem("data", JSON.stringify(data));
    console.log(data);
    createData();
}

const createData = () => {
  tasks.innerHTML = "";
  data.map((x,y) => {
    return (tasks.innerHTML += ` <div id=${y}>
    <span class="fw-bold">${x.text}</span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.Description}</p>
  
    <span class="options">
    <i onclick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fa-solid fa-pen-to-square"></i>
    <i onclick="deleteTask(this);createData()" class="fa-solid fa-trash-can"></i>
  </span>
  </div>`);
  })
  
resetData();
}

const resetData = () => {
  textInput.value = '';
  dateInput.value = '';
  textArea.value = '';
}

// delete task when icon is clicked
const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement, 1);
  localStorage.setItem("data", JSON.stringify(data));
}

// update items in cards
const editTask = (e) => {
  const selectedTask= e.parentElement.parentElement;
  textInput.value = selectedTask.children[0].innerHTML;;
  dateInput.value = selectedTask.children[1].innerHTML;
  textArea.value = selectedTask.children[2].innerHTML;
  deleteTask(e);
}

// to get data from ls
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  createData();
  console.log(data);

})();