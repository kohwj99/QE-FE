import { Alert, AlertTitle } from '@mui/material';
import { FC } from 'react';

interface ValidationErrorsProps {
  errors: string[];
}

export const ValidationErrors: FC<ValidationErrorsProps> = ({ errors }) => {
  if (errors.length === 0) return null;

  return (
    <Alert severity="error" sx={{ mt: 2 }}>
      <AlertTitle>Validation Errors</AlertTitle>
      <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    </Alert>
  );
};