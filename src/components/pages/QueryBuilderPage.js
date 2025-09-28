// src/pages/QueryBuilderPage.js
import { useState } from "react";
import QueryBuilderTemplate from "../templates/QueryBuilderTemplate";

export default function QueryBuilderPage() {
  const [query, setQuery] = useState({
    type: "AND",
    nodes: [{ id: "1", column: "", operator: "", value: "", isNull: false }]
  });
  const [errors, setErrors] = useState({});

  return (
    <QueryBuilderTemplate
      query={query}
      onQueryChange={(newGroup) => setQuery(newGroup)}
      errors={errors}
    />
  );
}
