const Filter = ({ currentValue, onFilterChange }) => {
    return (
      <div>
        filter shown with <input value={currentValue} onChange={onFilterChange} />
      </div>
    );
  };
  
  export default Filter;