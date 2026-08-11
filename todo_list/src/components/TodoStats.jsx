function TodoStats({ totalCount, activeCount, completedCount }) {
  return (
    <div className="todo-stats" aria-label="Todo statistics">
      <span>Total: {totalCount}</span>
      <span>Active: {activeCount}</span>
      <span>Completed: {completedCount}</span>
    </div>
  );
}

export default TodoStats;
