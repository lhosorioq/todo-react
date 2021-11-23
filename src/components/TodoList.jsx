import React from 'react'
import { TodoItem } from './TodoItem'

export function TodoList({todos, toggleTodo}) {
    return (
        <ul class="list-group list-group-flush"> 
            {todos.map((todo) => <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />)}
        </ul>
    )
}
// {todos.forEach((todo) => {
//     <li>Tarea</li>
// })}