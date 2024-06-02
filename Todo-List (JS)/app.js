document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');
  
    addTaskButton.addEventListener('click', function() {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
  
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'x';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', function() {
          taskList.removeChild(listItem);
        });
  
        listItem.appendChild(deleteButton);
        listItem.addEventListener('click', function() {
          listItem.classList.toggle('completed');
        });
  
        taskList.appendChild(listItem);
        taskInput.value = '';
      }
    });
  });
  