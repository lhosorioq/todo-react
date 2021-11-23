import React from 'react'

export function TodoItem({todo, toggleTodo}) {
    const {id, task, completed} = todo
    const handleTodoClick = () => {
        toggleTodo(id) 
    }
    return (
        <li class="list-group-item">
            <div class="form-check form-switch">
                <input checked={completed} onChange={handleTodoClick} class="form-check-input" type="checkbox" role="switch"/>
                <label class="form-check-label" for="flexSwitchCheckDefault">{task}</label>
            </div>
        </li>
    )
}
