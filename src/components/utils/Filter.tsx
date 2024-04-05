import React from 'react';
import TextField from '@mui/material/TextField';

// types.d
import { FilterProps } from '@/types';

const Filter: React.FC<FilterProps> = ({ filteredLength, filter, handleFilterChange }) => {
  return (
    <>
    <div className="filterWrap">
      <div className="filterWrap_box">
        <span className="length_results">
          {filteredLength}
        </span>
        <TextField
          id="filter"
          size="small"
          label="Find podcast:"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    </div>
    </>
  );
};

export default Filter;