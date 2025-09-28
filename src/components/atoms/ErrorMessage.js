// src/components/atoms/ErrorMessage.js
import { Alert } from "@mui/material";

export default function ErrorMessage({ errors }) {
  if (!errors || errors.length === 0) return null;
  return (
    <Alert severity="error" sx={{ mt: 1 }}>
      {errors.map((err, idx) => (
        <div key={idx}>• {err}</div>
      ))}
    </Alert>
  );
}
