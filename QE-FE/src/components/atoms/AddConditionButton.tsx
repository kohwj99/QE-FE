import { Button } from '@mui/material';
import { FC } from 'react';
import AddIcon from '@mui/icons-material/Add';

interface AddConditionButtonProps {
  label: string;
  onClick: () => void;
  startIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export const AddConditionButton: FC<AddConditionButtonProps> = ({ 
  label, 
  onClick, 
  startIcon = <AddIcon />,
  color = 'primary'
}) => {
  return (
    <Button
      variant="contained"
      color={color}
      onClick={onClick}
      startIcon={startIcon}
      sx={{
        px: 3,
        py: 1,
        borderRadius: 2,
        textTransform: 'none',
      }}
    >
      {label}
    </Button>
  );
};