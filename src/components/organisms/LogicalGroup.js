// src/components/organisms/LogicalGroup.js
import { Card, CardContent, Typography, Stack } from "@mui/material";
import Button from "../atoms/Button";
import FieldNode from "./FieldNode";

export default function LogicalGroup({ group, onUpdate, availableColumns, availableOperators, errors }) {
  const updateNode = (index, newNode) => {
    const newNodes = [...group.nodes];
    newNodes[index] = newNode;
    onUpdate({ ...group, nodes: newNodes });
  };

  const removeNode = (index) => {
    const newNodes = group.nodes.filter((_, i) => i !== index);
    onUpdate({ ...group, nodes: newNodes });
  };

  const addNode = () => {
    onUpdate({
      ...group,
      nodes: [...group.nodes, { id: Date.now().toString(), column: "", operator: "", value: "", isNull: false }]
    });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Group ({group.type})
        </Typography>
        {group.nodes.map((node, i) => (
          <FieldNode
            key={node.id}
            node={node}
            onUpdate={(newNode) => updateNode(i, newNode)}
            onRemove={() => removeNode(i)}
            availableColumns={availableColumns}
            availableOperators={availableOperators}
            errors={errors[node.id]}
          />
        ))}
        <Stack direction="row" spacing={1}>
          <Button onClick={addNode}>+ Field</Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
