import { FormControl, InputLabel, MenuItem, Select, TextField, Box, Checkbox, FormControlLabel } from '@mui/material';
import { FieldNode } from '../../types/queryBuilder';
import { mockColumns, operators } from '../../data/mockData';
import { FieldTypeBadge } from '../atoms/FieldTypeBadge';
import { Card } from '@mui/material';

interface FieldQueryProps {
  node: FieldNode;
  selectedTable: string;
  onUpdate: (updatedNode: FieldNode) => void;
  hasErrors?: boolean;
}

export const FieldQuery: React.FC<FieldQueryProps> = ({
  node,
  selectedTable,
  onUpdate,
  hasErrors = false,
}) => {
  const allColumns = selectedTable ? Object.values(mockColumns[selectedTable] || {}).flat() : [];
  const availableOperators = node.fieldType
    ? Object.keys(operators).filter(op => operators[op].supportedFieldTypes.includes(node.fieldType!))
    : [];

  const getValueInputType = () => {
    if (!node.fieldType || !node.operator) return 'text';
    
    const operatorConfig = operators[node.operator];
    if (!operatorConfig) return 'text';
    
    let valueType = node.fieldType;
    const matchingValueType = operatorConfig.supportedValueTypes.find(vt => vt === node.fieldType);
    if (matchingValueType) {
      valueType = matchingValueType;
    } else if (operatorConfig.supportedValueTypes.length > 0) {
      valueType = operatorConfig.supportedValueTypes[0];
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
      updatedNode.value = '';
    }
    
    onUpdate(updatedNode);
  };

  const getFieldTypeFromColumn = (table: string, column: string) => {
    if (!table || !column) return null;
    const tableColumns = mockColumns[table];
    if (!tableColumns) return null;
    
    for (const [fieldType, columns] of Object.entries(tableColumns)) {
      if (columns.includes(column)) {
        return fieldType;
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
        borderColor: hasErrors ? 'error.main' : 'grey.300',
        '&:hover': {
          borderColor: hasErrors ? 'error.dark' : 'primary.main',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Box sx={{ width: '8px', height: '8px', borderRadius: '50%', bgcolor: 'primary.main', mr: 1 }} />
        <Box component="span" sx={{ fontWeight: 'medium' }}>Field Query</Box>
        {node.fieldType && <FieldTypeBadge fieldType={node.fieldType} />}
      </Box>

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
              <MenuItem key={op} value={op}>{op.replace(/_/g, ' ')}</MenuItem>
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
              disabled={!node.column || !node.operator || node.isNull}
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
            disabled={!node.column || !node.operator || node.isNull}
            fullWidth
          />
        )}
      </Box>

      <FormControlLabel
        control={
          <Checkbox
            checked={node.isNull}
            onChange={(e) => handleFieldUpdate('isNull', e.target.checked)}
            disabled={!node.column}
          />
        }
        label="Is Null"
        sx={{ mt: 2 }}
      />
    </Card>
  );
};