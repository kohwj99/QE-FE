export type FieldType = 'STRING' | 'NUMERIC' | 'BOOLEAN' | 'DATE';
export type OperatorType = 'EQUALS' | 'NOT_EQUALS' | 'CONTAINS' | 'STARTS_WITH' | 'ENDS_WITH' |
  'GREATER_THAN' | 'LESS_THAN' | 'GREATER_EQUAL' | 'LESS_EQUAL' | 'DAY_OF_WEEK' | 'MONTH' | 'YEAR';

export interface FieldNode {
  id: number;
  type: 'field';
  fieldType: FieldType | null;
  column: string;
  operator: OperatorType | '';
  value: string;
  isNull: boolean;
}

export interface CompositeNode {
  id: number;
  type: 'composite';
  operator: 'AND' | 'OR';
  children: QueryNode[];
}

export type QueryNode = FieldNode | CompositeNode;

export interface NodeError {
  [key: string]: string[];
}