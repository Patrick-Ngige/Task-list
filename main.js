window.addEventListener('load', () => {
    const form = document.querySelector("#tk-form");
    const input = document.querySelector("#tk-form input");
    const list_el = document.querySelector("#tasks");

    let tasks = [];

    loadTasksFromStorage();

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if (!task) {
            alert("Please fill out the task");
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = "";

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerHTML.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
                updateTask(task_input_el.value, task_el);
                saveTasksToStorage();
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            tasks = tasks.filter((task) => task !== task_input_el.value);
            saveTasksToStorage();
        });

        tasks.push(task);
        saveTasksToStorage();
    });

    function saveTasksToStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasksFromStorage() {
        tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => {
            const task_el = createTaskElement(task);
            list_el.appendChild(task_el);
        });
    }

    function createTaskElement(task) {
        const task_el = document.createElement("div");
        task_el.classList.add("task");

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement("div");
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerHTML = "Edit";

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerHTML = "Delete";

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        task_edit_el.addEventListener('click', () => {
            if (task_edit_el.innerHTML.toLowerCase() == "edit") {
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
                updateTask(task_input_el.value, task_el);
                saveTasksToStorage();
            }
        });

        task_delete_el.addEventListener('click', () => {
            list_el.removeChild(task_el);
            tasks = tasks.filter((task) => task !== task_input_el.value);
            saveTasksToStorage();
        });

        return task_el;
    }

    function updateTask(newTask, taskElement) {
        const taskContentEl = taskElement.querySelector(".text");
        const index = Array.from(list_el.children).indexOf(taskElement);
        tasks[index] = newTask;
        taskContentEl.value = newTask;
    }
});
