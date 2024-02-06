let btnAddTaskEL = document.querySelector('button')
let taskNameEl = document.querySelector('#content')

// localStorage.removeItem('test')
let tasks = getTaskFromLocalStorge()
renderTasks(tasks)


btnAddTaskEL.addEventListener('click', function () {
    if (!taskNameEl.value) {
        alert('vui long nhap thong tin')
        return false

    }

    let tasks = getTaskFromLocalStorge()


    tasks.push({ name: taskNameEl.value })
    taskNameEl.value = ''

    localStorage.setItem('tasks', JSON.stringify(tasks))

    renderTasks(tasks)
})

// nut sua
function editTask(id) {
    let tasks = getTaskFromLocalStorge()

    if (tasks.length > 0) {
        let taskNameEl = document.querySelector('#content')
        let nameabc  = taskNameEl.value;
        alert("Đổi "+tasks[id].name+" thành "+nameabc)
        tasks[id].name = nameabc;

        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorge())
    }
}


// nut xoa
function deleteTask(id) {
    // alert(id)
    if (confirm('Ban co muon xoa khong')) {
        let tasks = getTaskFromLocalStorge()
        tasks.splice(id, 1)
        localStorage.setItem('tasks', JSON.stringify(tasks))
        renderTasks(getTaskFromLocalStorge())
    }
}

function renderTasks(tasks = []) {
    let content = '<ul>'

    tasks.forEach((task, index) => {
        content += `<li>
        <lable for="${index}"><input onclick = "updateStatus(this)" type = "checkbox" id = "${index}"></lable>
        <div class="taskname">${task.name} </div>
        <a href=""onclick = "editTask(${index})" ><i class="fa-solid fa-pen" style="color: #ededed;"></i></a>
        <a href=""onclick = "deleteTask(${index})"><i class="fa-solid fa-trash-can" style="color: #fcfcfc;"></i></a>
    </li>`
    })

    content += '</ul>'
    document.querySelector('#result').innerHTML = content
}
function updateStatus(selectedtaskname) {
    let taskName = selectedtaskname.parentElement.lastElementChild;
    if (selectedtaskname.checked) {
        taskName.classList.add("checked");
    } else {
        taskName.classList.remove("checked");
    }
}

 function getTaskFromLocalStorge() {
    return localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
}
