document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const filterAllButton = document.getElementById("filterAll");
    const filterActiveButton = document.getElementById("filterActive");
    const filterCompletedButton = document.getElementById("filterCompleted");
    const clearCompletedButton = document.getElementById("clearCompleted");

    let tasks = [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="task-text${task.completed ? ' completed' : ''}">${task.text}</span>
                <button class="edit">Edit</button>
                <button class="update">Update</button>
                <button class="delete">Delete</button>
                <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
            `;

            const editButton = li.querySelector(".edit");
            const updateButton = li.querySelector(".update");
            const deleteButton = li.querySelector(".delete");
            const completeButton = li.querySelector(".complete");
            const taskTextSpan = li.querySelector(".task-text");

            editButton.addEventListener("click", function () {
                taskInput.value = taskTextSpan.textContent;
                taskInput.dataset.editId = task.id;
                updateButton.style.display = "inline-block";
                editButton.style.display = "none";
            });

            updateButton.addEventListener("click", function () {
                const editedText = taskInput.value.trim();
                if (editedText !== "") {
                    task.text = editedText;
                    taskInput.value = "";
                    editButton.style.display = "inline-block";
                    updateButton.style.display = "none";
                    renderTasks();
                }
            });

            deleteButton.addEventListener("click", function () {
                tasks = tasks.filter((t) => t.id !== task.id);
                renderTasks();
            });

            completeButton.addEventListener("click", function () {
                task.completed = !task.completed;
                renderTasks();
            });

            li.dataset.id = task.id;

            taskList.appendChild(li);
        });
    }

    addTaskButton.addEventListener("click", function () {
        const taskText = taskInput.value.trim();

        if (taskText !== "") {
            tasks.push({ id: Date.now(), text: taskText, completed: false });
            taskInput.value = "";
            renderTasks();
        }
    });

    taskInput.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addTaskButton.click();
        }
    });

    filterAllButton.addEventListener("click", function () {
        filterTasks("all");
    });

    filterActiveButton.addEventListener("click", function () {
        filterTasks("active");
    });

    filterCompletedButton.addEventListener("click", function () {
        filterTasks("completed");
    });

    clearCompletedButton.addEventListener("click", function () {
        tasks = tasks.filter((task) => !task.completed);
        renderTasks();
    });

    function filterTasks(filterType) {
        const filteredTasks = tasks.filter((task) => {
            if (filterType === "active") {
                return !task.completed;
            } else if (filterType === "completed") {
                return task.completed;
            }
            return true; // "all" filter or default
        });

        renderTasks(filteredTasks);
    }

    renderTasks();
});
