import { Chip } from '@mui/material';
import { FC } from 'react';
import { FieldType } from '../../types/queryBuilder';

interface FieldTypeBadgeProps {
  fieldType: FieldType;
}

export const FieldTypeBadge: FC<FieldTypeBadgeProps> = ({ fieldType }) => {
  const getColor = () => {
    switch (fieldType) {
      case 'STRING':
        return 'primary';
      case 'NUMERIC':
        return 'secondary';
      case 'BOOLEAN':
        return 'success';
      case 'DATE':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <Chip
      label={fieldType}
      color={getColor()}
      size="small"
      variant="outlined"
      sx={{ ml: 1 }}
    />
  );
};