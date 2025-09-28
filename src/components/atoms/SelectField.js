// src/components/atoms/SelectField.js
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export default function SelectField({ label, value, onChange, options }) {
  return (
    <FormControl fullWidth size="small" sx={{ mr: 2, minWidth: 120 }}>
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
