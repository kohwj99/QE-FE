// src/components/atoms/Button.js
import { Button as MUIButton } from "@mui/material";

export default function Button({ children, onClick, variant = "contained", color = "primary" }) {
  return (
    <MUIButton variant={variant} color={color} onClick={onClick} sx={{ mr: 1 }}>
      {children}
    </MUIButton>
  );
}
