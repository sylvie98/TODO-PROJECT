const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const activeCountEl = document.getElementById('activeCount');
    const completedCountEl = document.getElementById('completedCount');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let tasks = [];

    // Add new task
    taskForm.addEventListener('submit', e => {
      e.preventDefault();
      const text = taskInput.value.trim();
      if (!text) return;
      tasks.push({ text, completed: false, id: Date.now() });
      taskInput.value = '';
      renderTasks();
    });

    // Render tasks list with filtering
    let currentFilter = 'all';
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currentFilter = btn.getAttribute('data-filter');
        filterButtons.forEach(b => b.classList.remove('bg-blue-900', 'text-white'));
        btn.classList.add('bg-blue-900', 'text-white');
        renderTasks();
      });
    });

    function renderTasks() {
      // Filter tasks based on currentFilter
      let filtered = tasks;
      if (currentFilter === 'active') {
        filtered = tasks.filter(t => !t.completed);
      } else if (currentFilter === 'completed') {
        filtered = tasks.filter(t => t.completed);
      }

      // Clear existing
      taskList.innerHTML = '';
      if (filtered.length === 0) {
        const li = document.createElement('li');
        li.className = 'text-center text-gray-500 italic';
        li.textContent = 'No tasks yet. Add one above!';
        taskList.appendChild(li);
      } else {
        filtered.forEach(task => {
          const li = document.createElement('li');
          li.className = 'flex items-center justify-between py-2 border-b last:border-b-0';

          const label = document.createElement('label');
          label.className = 'flex items-center gap-3 cursor-pointer flex-grow';

          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          checkbox.checked = task.completed;
          checkbox.className = 'form-checkbox h-5 w-5 text-blue-600';
          checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            renderTasks();
          });

          const span = document.createElement('span');
          span.textContent = task.text;
          span.className = task.completed ? 'line-through text-gray-400' : '';

          label.appendChild(checkbox);
          label.appendChild(span);

          const delBtn = document.createElement('button');
          delBtn.innerHTML = '<i class="fas fa-trash text-red-500 hover:text-red-700"></i>';
          delBtn.className = 'p-1';
          delBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
          });

          li.appendChild(label);
          li.appendChild(delBtn);
          taskList.appendChild(li);
        });
      }

      // Update counters
      const activeCount = tasks.filter(t => !t.completed).length;
      const completedCount = tasks.filter(t => t.completed).length;

      activeCountEl.textContent = activeCount;
      completedCountEl.textContent = completedCount;

      // Update filter buttons text count
      document.querySelector('[data-filter="all"]').textContent = `All (${tasks.length})`;
      document.querySelector('[data-filter="active"]').textContent = `Active (${activeCount})`;
      document.querySelector('[data-filter="completed"]').textContent = `Completed (${completedCount})`;
    }

    // Initial render
    renderTasks();

    // Dark Mode toggle example (optional)
    const themeToggle = document.getElementById('themeToggle');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      if (document.body.classList.contains('dark')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
         document.body.style.background = 'linear-gradient(to right, #bfdbfe, #dbeafe)';
        document.body.style.color = 'white';
      } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.body.style.background = 'linear-gradient(to right, 	#E6E6FA,#E0FFFF)';
        document.body.style.color = 'black';
      }
    });