const filters = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

function TodoFilter({ currentFilter, onChangeFilter }) {
  return (
    <div className="filter-group" aria-label="Todo filters">
      {filters.map((filter) => (
        <button
          key={filter.value}
          className={currentFilter === filter.value ? 'filter-button active' : 'filter-button'}
          type="button"
          onClick={() => onChangeFilter(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilter;
