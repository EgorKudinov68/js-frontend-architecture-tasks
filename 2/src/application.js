import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {
  const container = document.querySelector('.container.m-3');
  const form = container.querySelector('form');
  const input = form.querySelector('input[name="name"]');
  const tasksList = document.getElementById('tasks');
  
  const renderTasks = (tasks) => {
    tasksList.innerHTML = '';
    tasks.forEach(task => {
      const li = document.createElement('li');
      li.className = 'list-group-item';
      li.textContent = task.name;
      tasksList.appendChild(li);
    });
  };
  
  const loadTasks = async () => {
    try {
      const response = await axios.get(routes.tasksPath());
      const tasks = response.data.items || [];
      renderTasks(tasks);
    } catch (error) {
      console.error('Ошибка загрузки задач:', error);
    }
  };
  
  const addTask = async (taskName) => {
    try {
      const response = await axios.post(routes.tasksPath(), { name: taskName });
      if (response.status === 201) {
        await loadTasks();
        input.value = '';
        input.focus();
      }
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
    }
  };
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const taskName = input.value.trim();
    if (taskName) {
      await addTask(taskName);
    }
  });
  
  await loadTasks();
  input.focus();
};
// END