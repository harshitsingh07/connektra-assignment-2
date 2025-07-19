import React, { useState, useEffect } from "react";
import { Paper, Typography, TextField, Box, Alert } from "@mui/material";

export type TConfig = {
  [key: string]: Record<string, string>
}

interface ConfigurationModalProps {
  node: any;
  config: Record<string, any>;
  setConfig: (newConfig: Record<string, any>) => void;
}

export default function ConfigurationModal({
  node,
  config,
  setConfig,
}: ConfigurationModalProps) {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (node?.id && config[node.id]) {
      setInputValue(JSON.stringify(config[node.id], null, 2));
    } else {
      setInputValue("{}");
    }
  }, [node, config]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    try {
      const parsed = JSON.parse(value);
      setError("");
      setConfig({ ...config, [node.id]: parsed });
    } catch (err) {
      setError("Invalid JSON format");
    }
  };

  if (!node) return null;

  return (
    <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Configuring: {node.data.label}
      </Typography>
      <TextField
        label="JSON Configuration"
        multiline
        rows={6}
        fullWidth
        value={inputValue}
        onChange={handleChange}
        error={!!error}
        helperText={error || "Edit connector configuration as JSON"}
        sx={{ fontFamily: "monospace" }}
      />
      {error && (
        <Box mt={2}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
    </Paper>
  );
}
