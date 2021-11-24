import React, { Fragment, useState, useRef, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import { TodoList } from './components/TodoList'

const KEY = 'luigi-todo';

export function App() {
    const [todos, setTodos] = useState([
        { id: 1, task: 'Empezar a registrar mis tareas', completed: false }
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
                <h2 className="text-center">
                    Que Tengo Pendiente por Hacer...
                </h2>
                {todos.filter((todo)=> !todo.completed).length > 0 &&
                    <div className="text-center" >Me quedan {todos.filter((todo)=> !todo.completed).length} tareas por terminar.</div>
                }
                <hr />
                <div class="row">
                    <div class="col-sm-12 col-md-12 col-lg-8">
                        <div class="input-group mb-3">
                            <input ref={todoTaskRef} type="text" placeholder="Nueva tarea" class="form-control" />
                            <button onClick={handleTodoAdd} class="btn btn-outline-secondary">+</button>
                        </div>
                        <TodoList todos={todos} toggleTodo={toggleTodo} />
                        <hr />
                        <div class="d-grid gap-2">
                            <button onClick={handleClearAll} class="btn btn-danger" type="button">Eliminar Listado de Actividades Terminadas</button>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-12 col-lg-4">
                        <div class="alert alert-success" role="alert">
                            <p>
                                Aplicacion Web desarrollada para aprender y mejorar los conocimientos sobre React JS.
                            </p>
                            <p>
                                Es un desarrollo que almacena la informacion en LocalStorage de cada equipo y NO se gestiona con cuentas de correo. Libre acceso al desarrollo y al codigo fuente.
                            </p>
                        </div>
                        <div class="alert alert-secondary" role="alert">
                            <p>
                                Repositorio en GitHub
                                <br />https://github.com/lhosorioq/todo-react
                            </p>
                        </div>
                        <div class="alert alert-primary" role="alert">
                            Desarrollo de <a href="http://luigi.osoquisi.com" target="_blank">Luigi OsoQui</a>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );

}
