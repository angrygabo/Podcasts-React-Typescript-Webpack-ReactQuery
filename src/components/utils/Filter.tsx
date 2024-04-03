import React from 'react';
import TextField from '@mui/material/TextField';
import { FilterProps } from '../../types';

const Filter: React.FC<FilterProps> = ({ filteredPodcastsLength, filter, handleFilterChange }) => {
  return (
    <div className="filterWrap">
      <div className="filterWrap_box">
        <span className="length_podcast">
          {filteredPodcastsLength}
        </span>
        <TextField
          id="outlined-size-small"
          size="small"
          label="Find podcast:"
          variant="outlined"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>
    </div>
  );
};

export default Filter;