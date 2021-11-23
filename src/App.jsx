import React, { Fragment, useState, useRef, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { TodoList } from './components/TodoList'

const KEY = 'luigi-todo';

export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: 'Tarea 1', completed: false},
        { id: 2, task: 'Tarea 2', completed: true}
    ]);
    
    const todoTaskRef = useRef();

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(KEY));
        if ( storedTodos ) {
            setTodos(storedTodos);
        }
    }, []);
    
    useEffect(()=>{
        localStorage.setItem(KEY, JSON.stringify(todos));
    }, [todos]);
    const toggleTodo = (id) => {
        const newTodos = [...todos];
        const todo = newTodos.find((todo) => todo.id === id );
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }
    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        if ( task === '') return;
        setTodos((prevTodos)=> {
            const id = new Date();
            return [...prevTodos, {
                id: id,
                task: task, 
                completed: false
            }]
        });
        todoTaskRef.current.value = null
    };

    const handleClearAll = () => {
        const newTodos = todos.filter( (todo) => !todo.completed );
        setTodos(newTodos);
    } 
    return ( 
        <Fragment>
            <div className="container">
                <h2 className="text-center">Por Hacer</h2>
                <div className="text-center">Te quedan {todos.filter((todo)=> !todo.completed).length} tareas por terminar.</div>
                <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" />
                <button onClick={handleTodoAdd}>+</button>
                <TodoList todos={todos} toggleTodo={toggleTodo} />
                <div class="d-grid gap-2">
                    <button onClick={handleClearAll} class="btn btn-danger" type="button">Eliminar Listado de Actividades Terminadas</button>
                </div>
            </div>
        </Fragment>
    );

}
