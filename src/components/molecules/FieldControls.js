// src/components/molecules/FieldControls.js
import SelectField from "../atoms/SelectField";
import TextInput from "../atoms/TextInput";
import Checkbox from "../atoms/Checkbox";

export default function FieldControls({ node, onUpdate, availableColumns, availableOperators }) {
  return (
    <>
      <SelectField
        label="Column"
        value={node.column}
        onChange={(val) => onUpdate("column", val)}
        options={availableColumns.map((col) => ({ label: col, value: col }))}
      />
      <SelectField
        label="Operator"
        value={node.operator}
        onChange={(val) => onUpdate("operator", val)}
        options={availableOperators.map((op) => ({ label: op, value: op }))}
      />
      <TextInput
        label="Value"
        value={node.value}
        type="text"
        disabled={node.isNull}
        onChange={(val) => onUpdate("value", val)}
      />
      <Checkbox
        label="Is Null"
        checked={node.isNull}
        onChange={(val) => onUpdate("isNull", val)}
      />
    </>
  );
}
