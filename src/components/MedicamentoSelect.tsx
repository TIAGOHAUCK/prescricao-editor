import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { medicacoesPadrao } from '../data/medicacoesDB';
import { Medicamento } from '../types/prescricao';

interface MedicamentoSelectProps {
  value: string;
  onChange: (value: string, medicamento?: Medicamento) => void;
  error?: boolean;
  helperText?: string;
}

const MedicamentoSelect: React.FC<MedicamentoSelectProps> = ({
  value,
  onChange,
  error,
  helperText
}) => {
  return (
    <Autocomplete
      options={medicacoesPadrao.map(med => med.nome)}
      value={value}
      onChange={(_, newValue) => {
        const medicamento = medicacoesPadrao.find(med => med.nome === newValue);
        onChange(newValue || '', medicamento);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Medicamento"
          variant="outlined"
          fullWidth
          error={error}
          helperText={helperText}
          required
        />
      )}
      freeSolo
      autoSelect
      autoComplete
      clearOnBlur={false}
      blurOnSelect="touch"
    />
  );
};

export default MedicamentoSelect; 