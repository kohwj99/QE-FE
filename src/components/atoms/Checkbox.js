// src/components/atoms/Checkbox.js
import { FormControlLabel, Checkbox as MUICheckbox } from "@mui/material";

export default function Checkbox({ label, checked, onChange }) {
  return (
    <FormControlLabel
      control={<MUICheckbox checked={checked} onChange={(e) => onChange(e.target.checked)} />}
      label={label}
    />
  );
}
