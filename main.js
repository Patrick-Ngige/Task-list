window.addEventListener('load', ()=> {
    const form = document.querySelector("#tk-form");
    const input = document.querySelector("#tk-form-input");
    const list_el = document.querySelector("#tasks");

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const task = input.value;

        if(!task) {
            alert("please fill out the task");
            return;
        }

        const task_el = document.createElement("div");
        task_el.classList.add("task");
        task_content_el.innerText = task;

        const task_content_el = document.createElement("div");
        task.task_content_el.classList.add("content");

        task_el.appendChild(task_content_el);

        list_el.appendChild(task_el);

    })
})