document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const dueDate = document.getElementById("dueDate");
    const dueTime = document.getElementById("dueTime");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const darkModeToggle = document.getElementById("darkModeToggle");

    // Load saved tasks and dark mode setting
    loadTasks();
    loadDarkMode();

    addTaskButton.addEventListener("click", addTask);
    darkModeToggle.addEventListener("click", toggleDarkMode);

    function addTask() {
        const taskText = taskInput.value.trim();
        const taskDueDate = dueDate.value;
        const taskDueTime = dueTime.value;

        if (taskText === "" || taskDueDate === "" || taskDueTime === "") {
            alert("Please enter a task, date, and time.");
            return;
        }

        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <span>${taskText} (Due: ${taskDueDate} at ${taskDueTime})</span>
            <button class="delete-btn">X</button>
        `;

        taskItem.querySelector(".delete-btn").addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });

        taskList.appendChild(taskItem);
        saveTasks();

        taskInput.value = "";
        dueDate.value = "";
        dueTime.value = "";
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll("#taskList li").forEach(task => {
            tasks.push(task.innerHTML);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        savedTasks.forEach(taskHTML => {
            const taskItem = document.createElement("li");
            taskItem.innerHTML = taskHTML;
            taskItem.querySelector(".delete-btn").addEventListener("click", () => {
                taskItem.remove();
                saveTasks();
            });
            taskList.appendChild(taskItem);
        });
    }

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
    }

    function loadDarkMode() {
        if (localStorage.getItem("darkMode") === "true") {
            document.body.classList.add("dark-mode");
        }
    }
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/sw.js")
    .then(() => console.log("Service Worker Registered"))
    .catch((error) => console.log("Service Worker Registration Failed", error));
}