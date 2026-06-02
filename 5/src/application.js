import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
  
  let lists = [
    { id: uniqueId(), name: 'General', tasks: [] }
  ];
  let currentListId = lists[0].id;
  
  
  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');
  const newListForm = document.querySelector('[data-container="new-list-form"]');
  const newTaskForm = document.querySelector('[data-container="new-task-form"]');
  const newListInput = document.querySelector('#new-list-name');
  const newTaskInput = document.querySelector('#new-task-name');
  
  
  const renderLists = () => {
    const ul = document.createElement('ul');
    
    lists.forEach(list => {
      const li = document.createElement('li');
      
      if (list.id === currentListId) {
        const strong = document.createElement('b');
        strong.textContent = list.name;
        li.appendChild(strong);
      } else {
        const link = document.createElement('a');
        link.href = `#${list.name.toLowerCase()}`;
        link.textContent = list.name;
        link.addEventListener('click', (e) => {
          e.preventDefault();
          currentListId = list.id;
          renderLists();
          renderTasks();
        });
        li.appendChild(link);
      }
      
      ul.appendChild(li);
    });
    
    listsContainer.innerHTML = '';
    listsContainer.appendChild(ul);
  };
  
  
  const renderTasks = () => {
    const currentList = lists.find(list => list.id === currentListId);
    
    if (!currentList || currentList.tasks.length === 0) {
      tasksContainer.innerHTML = '';
      return;
    }
    
    const ul = document.createElement('ul');
    currentList.tasks.forEach(task => {
      const li = document.createElement('li');
      li.textContent = task;
      ul.appendChild(li);
    });
    
    tasksContainer.innerHTML = '';
    tasksContainer.appendChild(ul);
  };
  
  
  const addList = (listName) => {
    if (!listName || listName.trim() === '') return;
    
    const exists = lists.some(list => list.name.toLowerCase() === listName.toLowerCase());
    if (exists) return;
    
    const newList = {
      id: uniqueId(),
      name: listName.trim(),
      tasks: []
    };
    
    lists.push(newList);
    renderLists();
  };
  
  
  const addTask = (taskName) => {
    if (!taskName || taskName.trim() === '') return;
    
    const currentList = lists.find(list => list.id === currentListId);
    if (currentList) {
      currentList.tasks.push(taskName.trim());
      renderTasks();
    }
  };
  
  
  newListForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addList(newListInput.value);
    newListForm.reset();
    newListInput.focus();
  });
  
  newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(newTaskInput.value);
    newTaskForm.reset();
    newTaskInput.focus();
  });
  
  
  renderLists();
  renderTasks();
};
// END