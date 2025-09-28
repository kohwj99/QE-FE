// src/templates/QueryBuilderTemplate.js
import LogicalGroup from "../components/organisms/LogicalGroup";

export default function QueryBuilderTemplate({ query, onQueryChange, errors }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Query Builder</h2>
      <LogicalGroup
        group={query}
        onUpdate={onQueryChange}
        availableColumns={["name", "age", "salary"]}
        availableOperators={["equals", "greaterThan", "lessThan"]}
        errors={errors}
      />
    </div>
  );
}
