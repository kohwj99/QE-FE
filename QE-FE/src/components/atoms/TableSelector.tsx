import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';

interface TableSelectorProps {
  value: string;
  tables: string[];
  onChange: (value: string) => void;
}

export const TableSelector: FC<TableSelectorProps> = ({ value, tables, onChange }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="table-select-label">Select Table</InputLabel>
      <Select
        labelId="table-select-label"
        id="table-select"
        value={value}
        label="Select Table"
        onChange={handleChange}
      >
        <MenuItem value="">Choose a table...</MenuItem>
        {tables.map((table) => (
          <MenuItem key={table} value={table}>{table}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};