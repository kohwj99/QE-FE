import { Box, Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { TableSelector } from '../atoms/TableSelector';
import { AddConditionButton } from '../atoms/AddConditionButton';
import { mockTables } from '../../data/mockData';
import type { QueryNode, FieldType, CompositeNode, FieldNode } from '../../types/queryBuilder';
import { CompositeQuery } from '../molecules/CompositeQuery';
import { FieldQuery } from '../molecules/FieldQuery';
import { ValidationErrors } from '../atoms/ValidationErrors';
import GroupIcon from "@mui/icons-material/Group";
import FilterListIcon from '@mui/icons-material/FilterList';

interface QueryBuilderProps {
  onSave?: (query: QueryNode) => void;
}

export const QueryBuilder: React.FC<QueryBuilderProps> = ({ onSave }) => {
  const [selectedTable, setSelectedTable] = useState('');
  const [query, setQuery] = useState<QueryNode | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [nodeErrors, setNodeErrors] = useState<{ [key: string]: string[] }>({});
  const [jsonOutput, setJsonOutput] = useState('');

  // Update JSON output whenever query changes
  useEffect(() => {
    if (query) {
      const cleanedQuery = cleanQueryForOutput(query);
      setJsonOutput(JSON.stringify(cleanedQuery, null, 2));
    } else {
      setJsonOutput('');
    }
  }, [query]);

  interface CleanedQuery {
    type: string;
    children?: CleanedQuery[];
    column?: string;
    operator?: string;
    value?: string | null;
    valueType?: string;
  }

  const cleanQueryForOutput = (node: QueryNode): CleanedQuery => {
    if (node.type === 'composite') {
      return {
        type: node.operator === 'AND' ? 'AndQuery' : 'OrQuery',
        children: node.children.map(child => cleanQueryForOutput(child))
      };
    } else {
      // Field query
      const typeMap = {
        'STRING': 'StringQuery',
        'NUMERIC': 'NumericQuery',
        'BOOLEAN': 'BoolQuery',
        'DATE': 'DateQuery'
      };
      
      return {
        type: typeMap[node.fieldType as keyof typeof typeMap],
        column: node.column,
        operator: node.operator,
        value: node.isNull ? null : node.value,
        valueType: node.fieldType
      };
    }
  };

  const createNewQuery = (type: 'composite' | 'field') => {
    if (type === 'composite') {
      const compositeQuery: CompositeNode = {
        id: Date.now(),
        type: 'composite',
        operator: 'AND',
        children: []
      };
      setQuery(compositeQuery);
    } else {
      const fieldQuery: FieldNode = {
        id: Date.now(),
        type: 'field',
        fieldType: null,
        column: '',
        operator: '',
        value: '',
        isNull: false
      };
      setQuery(fieldQuery);
    }
  };

  const validateQuery = (node: QueryNode): string[] => {
    const errors: string[] = [];
    const newNodeErrors: { [key: string]: string[] } = {};

    if (node.type === 'composite') {
      if (!node.children || node.children.length === 0) {
        const error = 'Composite query must have at least one child condition';
        errors.push(`${node.id}: ${error}`);
        newNodeErrors[node.id] = [error];
      } else {
        node.children.forEach(child => {
          const childErrors = validateQuery(child);
          errors.push(...childErrors);
        });
      }
    } else {
      const nodeErrors: string[] = [];
      if (!node.column) {
        nodeErrors.push('Column must be selected');
      }
      if (!node.isNull && !node.value && node.operator) {
        nodeErrors.push('Value is required (or check "Is Null" if intended)');
      }
      if (nodeErrors.length > 0) {
        newNodeErrors[node.id] = nodeErrors;
        errors.push(...nodeErrors.map(e => `${node.id}: ${e}`));
      }
    }

    setNodeErrors(prev => ({ ...prev, ...newNodeErrors }));
    return errors;
  };

  const handleSave = () => {
    if (!query) {
      setValidationErrors(['No query to save']);
      return;
    }

    const errors = validateQuery(query);
    setValidationErrors(errors);

    if (errors.length === 0 && onSave) {
      onSave(query);
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" gutterBottom>
          Query Builder
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Build complex queries with an intuitive visual interface
        </Typography>

        <Box sx={{ mb: 4 }}>
          <TableSelector
            value={selectedTable}
            tables={mockTables}
            onChange={setSelectedTable}
          />
        </Box>

        {selectedTable && !query && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <AddConditionButton
              label="Start with Group (AND/OR)"
              onClick={() => createNewQuery('composite')}
              startIcon={<GroupIcon />}
              color="primary"
            />
            <AddConditionButton
              label="Start with Condition"
              onClick={() => createNewQuery('field')}
              startIcon={<FilterListIcon />}
              color="success"
            />
          </Box>
        )}

        {query && (
          <Box sx={{ mt: 3 }}>
            {query.type === 'composite' ? (
              <CompositeQuery
                node={query}
                onUpdate={setQuery}
                selectedTable={selectedTable}
                nodeErrors={nodeErrors}
                isRoot
              />
            ) : (
              <FieldQuery
                node={query}
                onUpdate={setQuery}
                selectedTable={selectedTable}
                hasErrors={!!nodeErrors[query.id]}
              />
            )}
          </Box>
        )}

        <ValidationErrors errors={validationErrors} />

        {query && (
          <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
            <AddConditionButton
              label="Save Query"
              onClick={handleSave}
              color="success"
            />
            <AddConditionButton
              label="Reset"
              onClick={() => {
                setQuery(null);
                setValidationErrors([]);
                setNodeErrors({});
              }}
              color="error"
            />
          </Box>
        )}

        {/* JSON Output */}
        {jsonOutput && (
          <Paper sx={{ mt: 4, p: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Generated Query JSON
            </Typography>
            <Box
              component="pre"
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'grey.300',
                overflow: 'auto',
                fontSize: '0.875rem'
              }}
            >
              <code>{jsonOutput}</code>
            </Box>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};