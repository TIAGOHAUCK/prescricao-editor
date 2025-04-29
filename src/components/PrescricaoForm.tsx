import React, { useState, useEffect } from 'react';
import { Button, Typography, Paper, Grid, Snackbar, Alert, Box } from '@mui/material';
import { Medicamento } from '../types/prescricao';
import PacienteInfoFields from './PacienteInfoFields';
import MedicamentoRow from './MedicamentoRow';
import MedicamentoSelector from './MedicamentoSelector';
import { usePrescricaoForm } from '../hooks/usePrescricaoForm';

const PrescricaoForm: React.FC = () => {
  const {
    control,
    errors,
    isLoading,
    alert,
    setAlert,
    handleSubmit,
    handleAddMedicamento,
    handleRemoveMedicamento,
    formData,
    setFormData,
    handleAddAllFixedMedications
  } = usePrescricaoForm();

  const [isSelectorOpen, setIsSelectorOpen] = useState(false);

  // Adiciona as medicações fixas automaticamente quando o componente é montado
  useEffect(() => {
    handleAddAllFixedMedications();
  }, []);

  const handleMedicamentoSelect = (medicamento: Medicamento) => {
    handleAddMedicamento(medicamento);
    setIsSelectorOpen(false);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Prescrição Médica
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <PacienteInfoFields control={control} errors={errors} />
        
        <Grid container spacing={2}>
          {formData.medicamentos?.map((medicamento, index) => (
            <Grid item xs={12} key={medicamento.id}>
              <MedicamentoRow
                medicamento={medicamento}
                index={index}
                control={control}
                errors={errors}
                onRemoveMedicamento={handleRemoveMedicamento}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: 'flex', gap: 2, mt: 2, mb: 2 }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => setIsSelectorOpen(true)}
          >
            Adicionar Medicamento
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={handleAddAllFixedMedications}
          >
            Adicionar Rotina
          </Button>
        </Box>
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isLoading}
          sx={{ mt: 2 }}
        >
          {isLoading ? 'Gerando...' : 'Gerar Prescrição'}
        </Button>
      </form>
      
      <MedicamentoSelector
        open={isSelectorOpen}
        onClose={() => setIsSelectorOpen(false)}
        onSelect={handleMedicamentoSelect}
      />
      
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert(prev => ({ ...prev, open: false }))}
      >
        <Alert severity={alert.severity}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default PrescricaoForm; 