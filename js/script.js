const todoControl = document.querySelector('.todo-control')
const headerInput = document.querySelector('.header-input')
const todoList = document.querySelector('.todo-list')
const todoCompleted = document.querySelector('.todo-completed')

let todoData = []

let todos = JSON.parse(localStorage.getItem('todos')) || []

const getLocal = function () {
    if (todos.length === 0) {
        return false
    } else {
        todoData = todos
        render()
    }
}



const render = function () {
    localStorage.setItem('todos', JSON.stringify(todoData))

    todoList.innerHTML = ''
    todoCompleted.innerHTML = ''

    todoData.forEach(function (item, index) {

        const li = document.createElement('li')
        li.classList.add('todo-item')
        li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
            '<div class="todo-buttons">' +
            '<button class="todo-remove"></button>' +
            '<button class="todo-complete"></button>' +
            '</div>'

        if (item.completed) {
            todoCompleted.append(li)

        } else {
            todoList.append(li)
        }

        li.querySelector('.todo-complete').addEventListener('click', function () {
            item.completed = !item.completed
            render()
        })

        li.querySelector('.todo-remove').addEventListener('click', function () {
            li.remove()
            todoData.splice(index, 1)
            render()

        })

    })

}



todoControl.addEventListener('submit', function (event) {
    event.preventDefault()
    if(headerInput.value === ''){
        return alert('Введите задачу!')
    }

    const newTodo = {
        text: headerInput.value,
        completed: false
    }

    todoData.push(newTodo)

    headerInput.value = ''

    render()

})
getLocal()