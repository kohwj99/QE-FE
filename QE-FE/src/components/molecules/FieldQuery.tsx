import { FormControl, InputLabel, MenuItem, Select, TextField, Box, Typography, IconButton } from '@mui/material';
import { ValidationErrors } from '../atoms/ValidationErrors';
import { FieldNode } from '../../types/queryBuilder';
import { mockColumns, operators } from '../../data/mockData';
import { FieldTypeBadge } from '../atoms/FieldTypeBadge';
import { Card } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface FieldQueryProps {
  node: FieldNode;
  selectedTable: string;
  onUpdate: (updatedNode: FieldNode) => void;
  onDelete?: () => void;
  errors?: string[];
}

export const FieldQuery: React.FC<FieldQueryProps> = ({
  node,
  selectedTable,
  onUpdate,
  onDelete,
  errors = [],
}) => {
  const allColumns: string[] = selectedTable ? Object.values(mockColumns[selectedTable as keyof typeof mockColumns] || {}).flat() : [];
  const availableOperators = node.fieldType
    ? operators.filter(op => op.supportedFieldTypes.includes(node.fieldType!))
    : [];

  const getValueInputType = () => {
    if (!node.fieldType || !node.operator) return 'text';
    
    const operatorConfig = operators.find(op => op.value === node.operator);
    if (!operatorConfig) return 'text';
    
    let valueType = node.fieldType;
    const matchingValueType = operatorConfig.supportedValueTypes.find(vt => vt === node.fieldType);
    if (matchingValueType) {
      valueType = matchingValueType as 'STRING' | 'NUMERIC' | 'BOOLEAN' | 'DATE';
    } else if (operatorConfig.supportedValueTypes.length > 0) {
      valueType = operatorConfig.supportedValueTypes[0] as 'STRING' | 'NUMERIC' | 'BOOLEAN' | 'DATE';
    }
    
    switch (valueType) {
      case 'DATE': return 'date';
      case 'NUMERIC': return 'number';
      case 'BOOLEAN': return 'select';
      default: return 'text';
    }
  };

  const handleFieldUpdate = (field: keyof FieldNode, value: any) => {
    const updatedNode = { ...node, [field]: value };
    
    if (field === 'column') {
      const fieldType = getFieldTypeFromColumn(selectedTable, value);
      updatedNode.fieldType = fieldType;
      updatedNode.operator = '';
      updatedNode.value = '';
    }
    if (field === 'operator') {
      if (['IS_NULL', 'IS_NOT_NULL'].includes(value)) {
        updatedNode.value = 'null';
      } else {
        updatedNode.value = '';
      }
    }
    
    onUpdate(updatedNode);
  };

  const getFieldTypeFromColumn = (table: string, column: string) => {
    if (!table || !column) return null;
    const tableColumns = mockColumns[table as keyof typeof mockColumns];
    if (!tableColumns) return null;
    
    for (const [fieldType, columns] of Object.entries(tableColumns)) {
      if ((columns as string[]).includes(column)) {
        return fieldType as 'STRING' | 'NUMERIC' | 'BOOLEAN' | 'DATE';
      }
    }
    return null;
  };

  return (
    <Card 
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        borderColor: errors.length > 0 ? 'error.main' : 'grey.300',
        '&:hover': {
          borderColor: errors.length > 0 ? 'error.dark' : 'primary.main',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: 'primary.main' }} />
          <Box component="span" sx={{ fontWeight: 'medium' }}>Field Query</Box>
          {node.fieldType && <FieldTypeBadge fieldType={node.fieldType} />}
        </Box>
        {onDelete && (
          <IconButton 
            onClick={onDelete}
            color="error"
            size="small"
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          <FormControl fullWidth>
            <InputLabel>Column</InputLabel>
            <Select
              value={node.column}
              label="Column"
              onChange={(e) => handleFieldUpdate('column', e.target.value)}
            >
              <MenuItem value="">Select column...</MenuItem>
              {allColumns.map(column => (
                <MenuItem key={column} value={column}>{column}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Operator</InputLabel>
            <Select
              value={node.operator}
              label="Operator"
              onChange={(e) => handleFieldUpdate('operator', e.target.value)}
              disabled={!node.column}
            >
              <MenuItem value="">Select operator...</MenuItem>
              {availableOperators.map(op => (
                <MenuItem 
                  key={op.value} 
                  value={op.value}
                >
                  {op.value.replace(/_/g, ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {getValueInputType() === 'select' ? (
            <FormControl fullWidth>
              <InputLabel>Value</InputLabel>
              <Select
                value={node.value}
                label="Value"
                onChange={(e) => handleFieldUpdate('value', e.target.value)}
                disabled={!node.column || !node.operator || ['IS_NULL', 'IS_NOT_NULL'].includes(node.operator)}
              >
                <MenuItem value="">Select...</MenuItem>
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <TextField
              label="Value"
              type={getValueInputType()}
              value={node.value}
              onChange={(e) => handleFieldUpdate('value', e.target.value)}
              disabled={!node.column || !node.operator || ['IS_NULL', 'IS_NOT_NULL'].includes(node.operator)}
              fullWidth
            />
          )}
        </Box>
        
        {node.operator && (
          <Typography 
            variant="caption" 
            color="text.secondary"
          >
            {operators.find(op => op.value === node.operator)?.description}
          </Typography>
        )}
      </Box>
      {errors.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <ValidationErrors errors={errors} />
        </Box>
      )}
    </Card>
  );
};