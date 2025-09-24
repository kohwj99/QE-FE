import { Box, Container } from '@mui/material';
import { QueryBuilder } from '../organisms/QueryBuilder';
import type { QueryNode } from '../../types/queryBuilder';

export const QueryBuilderPage = () => {
  const handleSave = (query: QueryNode) => {
    console.log('Query saved:', query);
    // Here you would typically save to a backend
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ py: 4 }}>
        <QueryBuilder onSave={handleSave} />
      </Box>
    </Container>
  );
};