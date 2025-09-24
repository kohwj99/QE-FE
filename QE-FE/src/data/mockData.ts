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

export const operators = {
  'EQUALS': {
    supportedFieldTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE'],
    supportedValueTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE']
  },
  'NOT_EQUALS': {
    supportedFieldTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE'],
    supportedValueTypes: ['STRING', 'NUMERIC', 'BOOLEAN', 'DATE']
  },
  'CONTAINS': {
    supportedFieldTypes: ['STRING'],
    supportedValueTypes: ['STRING']
  },
  'STARTS_WITH': {
    supportedFieldTypes: ['STRING'],
    supportedValueTypes: ['STRING']
  },
  'ENDS_WITH': {
    supportedFieldTypes: ['STRING'],
    supportedValueTypes: ['STRING']
  },
  'GREATER_THAN': {
    supportedFieldTypes: ['NUMERIC', 'DATE'],
    supportedValueTypes: ['NUMERIC', 'DATE']
  },
  'LESS_THAN': {
    supportedFieldTypes: ['NUMERIC', 'DATE'],
    supportedValueTypes: ['NUMERIC', 'DATE']
  },
  'GREATER_EQUAL': {
    supportedFieldTypes: ['NUMERIC', 'DATE'],
    supportedValueTypes: ['NUMERIC', 'DATE']
  },
  'LESS_EQUAL': {
    supportedFieldTypes: ['NUMERIC', 'DATE'],
    supportedValueTypes: ['NUMERIC', 'DATE']
  },
  'DAY_OF_WEEK': {
    supportedFieldTypes: ['DATE'],
    supportedValueTypes: ['NUMERIC']
  },
  'MONTH': {
    supportedFieldTypes: ['DATE'],
    supportedValueTypes: ['NUMERIC']
  },
  'YEAR': {
    supportedFieldTypes: ['DATE'],
    supportedValueTypes: ['NUMERIC']
  }
};