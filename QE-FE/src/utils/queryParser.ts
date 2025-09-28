import { QueryNode, CompositeNode, FieldNode } from '../types/queryBuilder';

export const parseQueryJson = (jsonString: string): QueryNode => {
  try {
    const parsedJson = JSON.parse(jsonString);
    return convertToQueryNode(parsedJson);
  } catch (error) {
    throw new Error('Invalid JSON format');
  }
};

const convertToQueryNode = (data: any): QueryNode => {
  if (!data.type) {
    throw new Error('Invalid query format: missing type');
  }

  if (data.type === 'AndQuery' || data.type === 'OrQuery') {
    const compositeNode: CompositeNode = {
      id: Date.now() + Math.random(),
      type: 'composite',
      operator: data.type === 'AndQuery' ? 'AND' : 'OR',
      children: (data.children || []).map(convertToQueryNode)
    };
    return compositeNode;
  } else if (data.type === 'FieldQuery') {
    const fieldNode: FieldNode = {
      id: Date.now() + Math.random(),
      type: 'field',
      column: data.column || '',
      operator: data.operator || '',
      value: data.value === null ? 'null' : data.value || '',
      fieldType: (data.valueType || '').toUpperCase() as 'STRING' | 'NUMERIC' | 'BOOLEAN' | 'DATE' | null,
      isNull: data.value === null
    };
    return fieldNode;
  }

  throw new Error(`Invalid query type: ${data.type}`);
};