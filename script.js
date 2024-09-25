document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("taskList");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const resetBtn = document.getElementById("resetBtn");
  const screenshotBtn = document.getElementById("screenshotBtn");
  const taskTable = document.getElementById("taskTable");

  const defaultTasks = [
    {
      name: "",
      status: "Not Started",
      deliveryDate: "",
      notes: "",
      done: false,
    },
    {
      name: "",
      status: "Not Started",
      deliveryDate: "",
      notes: "",
      done: false,
    },
    {
      name: "",
      status: "Not Started",
      deliveryDate: "",
      notes: "",
      done: false,
    },
    {
      name: "",
      status: "Not Started",
      deliveryDate: "",
      notes: "",
      done: false,
    },
  ];

  function loadTasks() {
    const savedTasks =
      JSON.parse(localStorage.getItem("tasks")) || defaultTasks;
    taskList.innerHTML = "";
    savedTasks.forEach((task, index) => {
      addTaskRow(task, index + 1);
    });
  }

  function addTaskRow(task, index) {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index}</td>
            <td><input type="text" value="${task.name}" /></td>
            <td>
                <select>
                    <option ${
                      task.status === "Not Started" ? "selected" : ""
                    }>Not Started</option>
                    <option ${
                      task.status === "In Progress" ? "selected" : ""
                    }>In Progress</option>
                    <option ${
                      task.status === "In Review" ? "selected" : ""
                    }>In Review</option>
                    <option ${
                      task.status === "Waiting For assets" ? "selected" : ""
                    }>Waiting For assets</option>
                    <option ${
                      task.status === "Completed" ? "selected" : ""
                    }>Completed</option>
                </select>
            </td>
            <td><input type="date" value="${task.deliveryDate}" /></td>
            <td><textarea rows="2">${task.notes}</textarea></td>
            <td><input type="checkbox" ${task.done ? "checked" : ""} /></td>
        `;
    taskList.appendChild(row);
  }

  addTaskBtn.addEventListener("click", () => {
    const newTask = {
      name: "",
      status: "Not Started",
      deliveryDate: "",
      notes: "",
      done: false,
    };
    const index = taskList.children.length + 1;
    addTaskRow(newTask, index);
    saveTasks();
  });

  resetBtn.addEventListener("click", () => {
    taskList.innerHTML = "";
    localStorage.removeItem("tasks");
    loadTasks();
  });

  function saveTasks() {
    const tasks = Array.from(taskList.children).map((row) => {
      const inputs = row.querySelectorAll("input, select, textarea");
      return {
        name: inputs[0].value,
        status: inputs[1].value,
        deliveryDate: inputs[2].value,
        notes: inputs[3].value,
        done: inputs[4].checked,
      };
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  loadTasks();
  window.addEventListener("beforeunload", saveTasks);
});
