import { Box, Card, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import type { CompositeNode, QueryNode, FieldNode } from '../../types/queryBuilder';
import { FieldQuery } from './FieldQuery';
import { AddConditionButton } from '../atoms/AddConditionButton';
import GroupIcon from "@mui/icons-material/Group";
import FilterListIcon from '@mui/icons-material/FilterList';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';

interface CompositeQueryProps {
  node: CompositeNode;
  onUpdate: (updatedNode: CompositeNode) => void;
  onDelete?: () => void;
  selectedTable: string;
  nodeErrors?: { [key: string]: string[] };
  isRoot?: boolean;
}

export const CompositeQuery: React.FC<CompositeQueryProps> = ({
  node,
  onUpdate,
  onDelete,
  selectedTable,
  nodeErrors = {},
  isRoot = false,
}) => {
  const hasErrors = nodeErrors[node.id]?.length > 0;

  const addChild = (type: 'composite' | 'field') => {
    if (type === 'composite') {
      const compositeChild: CompositeNode = {
        id: Date.now() + Math.random(),
        type: 'composite',
        operator: 'AND',
        children: []
      };
      onUpdate({
        ...node,
        children: [...node.children, compositeChild]
      });
    } else {
      const fieldChild: FieldNode = {
        id: Date.now() + Math.random(),
        type: 'field',
        fieldType: null,
        column: '',
        operator: '',
        value: '',
        isNull: false
      };
      onUpdate({
        ...node,
        children: [...node.children, fieldChild]
      });
    }
  };

  const updateChild = (index: number, updatedChild: QueryNode) => {
    const updatedChildren = [...node.children];
    updatedChildren[index] = updatedChild;
    onUpdate({ ...node, children: updatedChildren });
  };

  const removeChild = (index: number) => {
    onUpdate({
      ...node,
      children: node.children.filter((_, i) => i !== index)
    });
  };

  const updateOperator = (newOperator: 'AND' | 'OR') => {
    onUpdate({ ...node, operator: newOperator });
  };

  return (
    <Card
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        borderColor: hasErrors ? 'error.main' : node.operator === 'AND' ? 'info.main' : 'warning.main',
        bgcolor: node.operator === 'AND' ? 'info.50' : 'warning.50',
        '&:hover': {
          borderColor: hasErrors ? 'error.dark' : node.operator === 'AND' ? 'info.dark' : 'warning.dark',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ 
            width: '8px', 
            height: '8px', 
            borderRadius: '50%', 
            bgcolor: node.operator === 'AND' ? 'info.main' : 'warning.main' 
          }} />
          <Box component="span" sx={{ fontWeight: 'medium' }}>Composite Query</Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Operator</InputLabel>
            <Select
              value={node.operator}
              label="Operator"
              onChange={(e) => updateOperator(e.target.value as 'AND' | 'OR')}
            >
              <MenuItem value="AND">AND</MenuItem>
              <MenuItem value="OR">OR</MenuItem>
            </Select>
          </FormControl>
          {!isRoot && (
            <IconButton 
              onClick={onDelete}
              color="error"
              size="small"
            >
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      </Box>

      {node.children.map((child, index) => (
        <Box key={child.id} sx={{ mb: 2 }}>
          {index > 0 && (
            <Box 
              sx={{ 
                py: 1, 
                px: 2, 
                mb: 2,
                display: 'inline-block',
                borderRadius: 1,
                bgcolor: node.operator === 'AND' ? 'info.main' : 'warning.main',
                color: 'white',
                fontWeight: 'medium',
                fontSize: '0.875rem',
              }}
            >
              {node.operator}
            </Box>
          )}
          {child.type === 'composite' ? (
            <CompositeQuery
              node={child}
              onUpdate={(updatedChild) => updateChild(index, updatedChild)}
              onDelete={() => removeChild(index)}
              selectedTable={selectedTable}
              nodeErrors={nodeErrors}
            />
          ) : (
            <FieldQuery
              node={child}
              onUpdate={(updatedChild) => updateChild(index, updatedChild)}
              selectedTable={selectedTable}
              hasErrors={!!nodeErrors[child.id]}
            />
          )}
        </Box>
      ))}

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        <AddConditionButton
          label="Add Group (AND/OR)"
          onClick={() => addChild('composite')}
          startIcon={<GroupIcon />}
          color="primary"
        />
        <AddConditionButton
          label="Add Condition"
          onClick={() => addChild('field')}
          startIcon={<FilterListIcon />}
          color="success"
        />
      </Box>
    </Card>
  );
};