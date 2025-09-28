import { Box, Paper, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import { QueryNode } from '../../types/queryBuilder';
import { QueryBuilder } from '../organisms/QueryBuilder';
import { parseQueryJson } from '../../utils/queryParser';

export const QueryLoaderPage = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedQuery, setParsedQuery] = useState<QueryNode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleLoadQuery = () => {
    try {
      const query = parseQueryJson(jsonInput);
      setParsedQuery(query);
      setError(null);
    } catch (err) {
      setError((err as Error).message);
      setParsedQuery(null);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Load Existing Query
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" paragraph>
        Paste your query JSON below to load and edit it
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <TextField
          label="Query JSON"
          multiline
          rows={4}
          fullWidth
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          error={!!error}
          helperText={error}
          sx={{ mb: 2 }}
        />
        <Button 
          variant="contained" 
          onClick={handleLoadQuery}
          disabled={!jsonInput.trim()}
        >
          Load Query
        </Button>
      </Paper>

      {parsedQuery && (
        <QueryBuilder
          initialQuery={parsedQuery}
          onSave={(query) => {
            console.log('Saved query:', query);
          }}
        />
      )}
    </Box>
  );
};