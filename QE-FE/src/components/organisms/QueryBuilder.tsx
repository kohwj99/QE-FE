import { Box, Paper, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { TableSelector } from '../atoms/TableSelector';
import { AddConditionButton } from '../atoms/AddConditionButton';
import { mockTables, mockColumns } from '../../data/mockData';
import type { QueryNode, FieldType, CompositeNode, FieldNode } from '../../types/queryBuilder';
import { CompositeQuery } from '../molecules/CompositeQuery';
import { FieldQuery } from '../molecules/FieldQuery';
import GroupIcon from "@mui/icons-material/Group";
import FilterListIcon from '@mui/icons-material/FilterList';

interface QueryBuilderProps {
  onSave?: (query: QueryNode) => void;
  initialQuery?: QueryNode;
}

export const QueryBuilder: React.FC<QueryBuilderProps> = ({ onSave, initialQuery }) => {
  const [selectedTable, setSelectedTable] = useState('');
  const [query, setQuery] = useState<QueryNode | null>(initialQuery || null);

  // Initialize table if there's an initial query
  useEffect(() => {
    if (initialQuery) {
      // Find first column in the query to determine table
      const findFirstColumn = (node: QueryNode): string | null => {
        if (node.type === 'field') {
          return node.column;
        } else {
          for (const child of node.children) {
            const column = findFirstColumn(child);
            if (column) return column;
          }
          return null;
        }
      };

      const firstColumn = findFirstColumn(initialQuery);
      if (firstColumn) {
        // Find which table this column belongs to
        for (const [table, columns] of Object.entries(mockColumns)) {
          const allColumns = Object.values(columns as Record<string, string[]>).flat();
          if (allColumns.includes(firstColumn)) {
            setSelectedTable(table);
            break;
          }
        }
      }
    }
  }, [initialQuery]);
  const [nodeErrors, setNodeErrors] = useState<{ [key: string]: string[] }>({});
  const [jsonOutput, setJsonOutput] = useState('');

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
      return {
        type: 'FieldQuery',
        column: node.column,
        operator: node.operator,
        value: ['IS_NULL', 'IS_NOT_NULL'].includes(node.operator) ? null : node.value,
        valueType: node.fieldType?.toLowerCase()
      };
    }
  };

  const validateFieldNode = (node: FieldNode): string[] => {
    const errors: string[] = [];
    if (!node.column) {
      errors.push('Column is required');
    }
    if (!node.operator) {
      errors.push('Operator is required');
    }
    if (!['IS_NULL', 'IS_NOT_NULL'].includes(node.operator) && !node.value) {
      errors.push('Value is required');
    }
    return errors;
  };

  const validateCompositeNode = (node: CompositeNode): void => {
    if (node.children.length === 0) {
      setNodeErrors(prev => ({
        ...prev,
        [node.id]: ['At least one condition is required']
      }));
      return;
    }

    node.children.forEach(child => {
      if (child.type === 'field') {
        const errors = validateFieldNode(child);
        if (errors.length > 0) {
          setNodeErrors(prev => ({
            ...prev,
            [child.id]: errors
          }));
        } else {
          setNodeErrors(prev => {
            const newErrors = { ...prev };
            delete newErrors[child.id];
            return newErrors;
          });
        }
      } else {
        validateCompositeNode(child);
      }
    });
  };

  const createNewQuery = (type: 'composite' | 'field') => {
    if (type === 'composite') {
      setQuery({
        id: Date.now(),
        type: 'composite',
        operator: 'AND',
        children: []
      });
    } else {
      setQuery({
        id: Date.now(),
        type: 'field',
        fieldType: null,
        column: '',
        operator: '',
        value: '',
        isNull: false
      });
    }
  };

  const handleSave = () => {
    if (!query) {
      setNodeErrors({ root: ['No query to save'] });
      return;
    }

    setNodeErrors({});

    if (query.type === 'composite') {
      validateCompositeNode(query);
    } else {
      const errors = validateFieldNode(query);
      if (errors.length > 0) {
        setNodeErrors({ [query.id]: errors });
        return;
      }
    }

    if (onSave) {
      onSave(query);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: 4,
          borderRadius: 3,
          bgcolor: 'grey.50',
          width: '100%'
        }}
      >
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
                errors={nodeErrors[query.id] || []}
              />
            )}
          </Box>
        )}

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
                setNodeErrors({});
              }}
              color="error"
            />
          </Box>
        )}

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