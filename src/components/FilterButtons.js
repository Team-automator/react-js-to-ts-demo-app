import React from 'react';

function FilterButtons({ currentFilter, onChange }) {
  const filters = ['All', 'Active', 'Completed'];

  return (
    <div style={{ marginTop: '10px' }}>
      {filters.map(filter => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          disabled={filter === currentFilter}
          style={{ marginRight: '5px' }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterButtons;
