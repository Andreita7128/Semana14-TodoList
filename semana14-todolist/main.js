import './style.css'
import { getTasks, addTask, editDocumentCheck, editDocumentNoCheck } from './firebase.js'

let tasks = [];
await renderTasks();

const buttonTask = document.getElementById('create_todo');
buttonTask.addEventListener('click', async ()=> await handleClick())

async function renderTasks(){

  tasks = await getTasks();
  const todosContainer = document.querySelector('#to_dos_container')

  todosContainer.innerHTML = ''

  tasks.forEach(task => {
    const elem = document.createElement('li');
    elem.textContent = task.title;
    if(task.completed){
      elem.style.textDecoration = 'line-through'
      elem.style.color = '#B2B2B2';
    }
    elem.addEventListener('click', async ()=> {
      if(task.completed){
        await editDocumentNoCheck(task.title, task.id)
      } else {
        await editDocumentCheck(task.title, task.id)
      }
      await renderTasks();
    });

    todosContainer.append(elem);
  });
}

async function handleClick() {
  const inputTask = document.getElementById('input_todo');
  const inputText = inputTask.value;

  addTask(inputText);
  inputTask.value = '';
  await renderTasks()
}




