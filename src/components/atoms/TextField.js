// src/components/atoms/TextInput.js
import { TextField } from "@mui/material";

export default function TextInput({ label, value, onChange, type = "text", disabled }) {
  return (
    <TextField
      size="small"
      label={label}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      sx={{ mr: 2 }}
    />
  );
}
