import { useState } from 'react';

function TodoItem({ todo, onToggleTodo, onDeleteTodo, onEditTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    const trimmedText = editedText.trim();

    if (!trimmedText) {
      return;
    }

    onEditTodo(todo.id, trimmedText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedText(todo.text);
    setIsEditing(false);
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    handleSave();
  };

  return (
    <li className="todo-item">
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleTodo(todo.id)}
        aria-label={`Mark ${todo.text} as ${todo.completed ? 'active' : 'completed'}`}
      />

      {isEditing ? (
        <form className="edit-form" onSubmit={handleEditSubmit}>
          <label className="sr-only" htmlFor={`edit-${todo.id}`}>
            Edit todo
          </label>
          <input
            id={`edit-${todo.id}`}
            type="text"
            value={editedText}
            onChange={(event) => setEditedText(event.target.value)}
            autoFocus
          />
          <div className="item-actions">
            <button type="submit">Save</button>
            <button className="secondary-button" type="button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <span className={todo.completed ? 'todo-text completed' : 'todo-text'}>
            {todo.text}
          </span>
          <div className="item-actions">
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
            <button className="delete-button" type="button" onClick={() => onDeleteTodo(todo.id)}>
              Delete
            </button>
          </div>
        </>
      )}
    </li>
  );
}

export default TodoItem;
