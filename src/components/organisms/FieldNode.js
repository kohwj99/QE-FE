// src/components/organisms/FieldNode.js
import { Card, CardContent, Stack } from "@mui/material";
import FieldControls from "../molecules/FieldControls";
import ErrorMessage from "../atoms/ErrorMessage";
import Button from "../atoms/Button";

export default function FieldNode({ node, onUpdate, onRemove, availableColumns, availableOperators, errors }) {
  const updateField = (field, value) => {
    onUpdate({ ...node, [field]: value });
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" alignItems="center" spacing={2}>
          <FieldControls
            node={node}
            onUpdate={updateField}
            availableColumns={availableColumns}
            availableOperators={availableOperators}
          />
          <Button color="error" onClick={onRemove}>Remove</Button>
        </Stack>
        <ErrorMessage errors={errors} />
      </CardContent>
    </Card>
  );
}
