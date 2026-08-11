import { useState } from 'react';

function TodoForm({ onAddTodo }) {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTodo(todoText);
    setTodoText('');
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="todo-input">
        New todo
      </label>
      <input
        id="todo-input"
        type="text"
        value={todoText}
        onChange={(event) => setTodoText(event.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoForm;
