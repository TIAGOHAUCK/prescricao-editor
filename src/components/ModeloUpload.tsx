import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ModeloUploadProps {
  onModeloLoaded: (file: File) => void;
}

const ModeloUpload: React.FC<ModeloUploadProps> = ({ onModeloLoaded }) => {
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFileName(file.name);
      onModeloLoaded(file);
    }
  };

  return (
    <Box sx={{ mb: 3 }}>
      <input
        accept=".docx"
        style={{ display: 'none' }}
        id="modelo-upload"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="modelo-upload">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Carregar Modelo
        </Button>
      </label>
      {fileName && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Modelo carregado: {fileName}
        </Typography>
      )}
    </Box>
  );
};

export default ModeloUpload; 