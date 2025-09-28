export const mockTables = ['Users', 'Orders', 'Products', 'Categories', 'Customers'];

export const mockColumns = {
  Users: {
    STRING: ['username', 'email', 'first_name', 'last_name'],
    NUMERIC: ['id', 'age', 'salary'],
    BOOLEAN: ['is_active', 'is_verified'],
    DATE: ['created_at', 'updated_at', 'birth_date']
  },
  Orders: {
    STRING: ['order_number', 'status', 'shipping_address'],
    NUMERIC: ['id', 'user_id', 'total_amount', 'quantity'],
    BOOLEAN: ['is_paid', 'is_shipped'],
    DATE: ['order_date', 'shipped_date', 'delivery_date']
  },
  Products: {
    STRING: ['name', 'description', 'sku', 'category'],
    NUMERIC: ['id', 'price', 'stock_quantity', 'weight'],
    BOOLEAN: ['is_available', 'is_featured'],
    DATE: ['created_at', 'updated_at']
  }
};

export const operators = [
  {
    value: 'IS_NULL',
    supportedFieldTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE'],
    supportedValueTypes: [],
    description: 'Checks if the field has no value'
  },
  {
    value: 'IS_NOT_NULL',
    supportedFieldTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE'],
    supportedValueTypes: [],
    description: 'Checks if the field has any value'
  },
  {
    value: 'EQUALS',
    supportedFieldTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE'],
    supportedValueTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE'],
    description: 'Checks if the field exactly matches the given value'
  },
  {
    value: 'NOT_EQUALS',
    supportedFieldTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE'],
    supportedValueTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE'],
    description: 'Checks if the field does not match the given value'
  },
  {
    value: 'CONTAINS',
    supportedFieldTypes: ['STRING'],
    supportedValueTypes: ['STRING'],
    description: 'Checks if the field contains the given text'
  },
  {
    value: 'STARTS_WITH',
    supportedFieldTypes: ['STRING'],
    supportedValueTypes: ['STRING'],
    description: 'Checks if the field starts with the given text'
  },
  {
    value: 'ENDS_WITH',
    supportedFieldTypes: ['STRING'],
    supportedValueTypes: ['STRING'],
    description: 'Checks if the field ends with the given text'
  },
  {
    value: 'GREATER_THAN',
    supportedFieldTypes: ['NUMERIC', 'DATE'],
    supportedValueTypes: ['NUMERIC', 'DATE'],
    description: 'Checks if the field is greater than the given value'
  },
  {
    value: 'LESS_THAN',
    supportedFieldTypes: ['NUMERIC', 'DATE'],
    supportedValueTypes: ['NUMERIC', 'DATE'],
    description: 'Checks if the field is less than the given value'
  },
  {
    value: 'GREATER_EQUAL',
    supportedFieldTypes: ['NUMERIC', 'DATE'],
    supportedValueTypes: ['NUMERIC', 'DATE'],
    description: 'Checks if the field is greater than or equal to the given value'
  },
  {
    value: 'LESS_EQUAL',
    supportedFieldTypes: ['NUMERIC', 'DATE'],
    supportedValueTypes: ['NUMERIC', 'DATE'],
    description: 'Checks if the field is less than or equal to the given value'
  },
  {
    value: 'DAY_OF_WEEK',
    supportedFieldTypes: ['DATE'],
    supportedValueTypes: ['NUMERIC'],
    description: 'Matches the day of the week (1-7, where 1 is Monday)'
  },
  {
    value: 'MONTH',
    supportedFieldTypes: ['DATE'],
    supportedValueTypes: ['NUMERIC'],
    description: 'Matches the month (1-12)'
  },
  {
    value: 'YEAR',
    supportedFieldTypes: ['DATE'],
    supportedValueTypes: ['NUMERIC'],
    description: 'Matches the year'
  }
];