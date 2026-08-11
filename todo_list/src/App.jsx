import { useEffect, useState } from 'react';
import './App.css';
import TodoFilter from './components/TodoFilter.jsx';
import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';
import TodoStats from './components/TodoStats.jsx';

const TODOS_STORAGE_KEY = 'todo-list-items';
const FILTER_STORAGE_KEY = 'todo-list-filter';

function getSavedTodos() {
  const savedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
  return savedTodos ? JSON.parse(savedTodos) : [];
}

function getSavedFilter() {
  return localStorage.getItem(FILTER_STORAGE_KEY) || 'all';
}

function App() {
  const [todos, setTodos] = useState(getSavedTodos);
  const [filter, setFilter] = useState(getSavedFilter);

  useEffect(() => {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem(FILTER_STORAGE_KEY, filter);
  }, [filter]);

  const addTodo = (todoText) => {
    const trimmedText = todoText.trim();

    if (!trimmedText) {
      return;
    }

    const newTodo = {
      id: crypto.randomUUID(),
      text: trimmedText,
      completed: false,
    };

    setTodos((currentTodos) => [newTodo, ...currentTodos]);
  };

  const toggleTodo = (todoId) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (todoId) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== todoId));
  };

  const editTodo = (todoId, updatedText) => {
    const trimmedText = updatedText.trim();

    if (!trimmedText) {
      return;
    }

    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === todoId ? { ...todo, text: trimmedText } : todo,
      ),
    );
  };

  const clearCompletedTodos = () => {
    setTodos((currentTodos) => currentTodos.filter((todo) => !todo.completed));
  };

  const activeCount = todos.filter((todo) => !todo.completed).length;
  const completedCount = todos.filter((todo) => todo.completed).length;

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <main className="app">
      <section className="todo-panel" aria-labelledby="todo-title">
        <div className="todo-header">
          <div>
            <p className="eyebrow">React + Vite</p>
            <h1 id="todo-title">Todo List</h1>
          </div>
        </div>

        <TodoForm onAddTodo={addTodo} />

        <TodoFilter currentFilter={filter} onChangeFilter={setFilter} />

        <TodoList
          todos={filteredTodos}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onEditTodo={editTodo}
        />

        <footer className="todo-footer">
          <TodoStats
            totalCount={todos.length}
            activeCount={activeCount}
            completedCount={completedCount}
          />
          <button
            className="clear-button"
            type="button"
            onClick={clearCompletedTodos}
            disabled={completedCount === 0}
          >
            Clear Completed
          </button>
        </footer>
      </section>
    </main>
  );
}

export default App;
