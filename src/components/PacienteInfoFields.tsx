import React from 'react';
import { TextField, Box } from '@mui/material';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormData } from '../types/prescricao';

interface PacienteInfoFieldsProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

const PacienteInfoFields: React.FC<PacienteInfoFieldsProps> = ({ control, errors }) => {
  const handleDateChange = (field: any, value: string) => {
    console.log('Campo de data alterado:', field.name, 'Valor:', value);
    field.onChange(value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        {...control.register('nomePaciente')}
        label="Nome do Paciente"
        fullWidth
        error={!!errors.nomePaciente}
        helperText={errors.nomePaciente?.message}
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          {...control.register('idade')}
          label="Idade"
          type="number"
          fullWidth
          error={!!errors.idade}
          helperText={errors.idade?.message}
        />
        <Controller
          name="dih"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="DIH"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.dih}
              helperText={errors.dih?.message}
              onChange={(e) => handleDateChange(field, e.target.value)}
            />
          )}
        />
        <Controller
          name="dataHoje"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Data de Hoje"
              type="date"
              fullWidth
              InputLabelProps={{ shrink: true }}
              error={!!errors.dataHoje}
              helperText={errors.dataHoje?.message}
              onChange={(e) => handleDateChange(field, e.target.value)}
            />
          )}
        />
      </Box>

      <TextField
        {...control.register('diagnostico')}
        label="Diagnóstico"
        fullWidth
        error={!!errors.diagnostico}
        helperText={errors.diagnostico?.message}
      />

      <TextField
        {...control.register('alergias')}
        label="Alergias"
        fullWidth
        error={!!errors.alergias}
        helperText={errors.alergias?.message}
      />

      <TextField
        {...control.register('origem')}
        label="Origem"
        fullWidth
        error={!!errors.origem}
        helperText={errors.origem?.message}
      />

      <TextField
        {...control.register('admissao')}
        label="Admissão"
        fullWidth
        multiline
        rows={4}
        error={!!errors.admissao}
        helperText={errors.admissao?.message}
      />

      <TextField
        {...control.register('comorbidades')}
        label="Comorbidades"
        fullWidth
        multiline
        rows={4}
        error={!!errors.comorbidades}
        helperText={errors.comorbidades?.message}
      />

      <TextField
        {...control.register('muc')}
        label="MUC"
        fullWidth
        error={!!errors.muc}
        helperText={errors.muc?.message}
      />

      <TextField
        {...control.register('exameFisico')}
        label="Exame Físico"
        fullWidth
        multiline
        rows={4}
        error={!!errors.exameFisico}
        helperText={errors.exameFisico?.message}
      />

      <TextField
        {...control.register('analise')}
        label="Análise"
        fullWidth
        error={!!errors.analise}
        helperText={errors.analise?.message}
      />

      <TextField
        {...control.register('condutas')}
        label="Condutas"
        fullWidth
        multiline
        rows={4}
        error={!!errors.condutas}
        helperText={errors.condutas?.message}
      />
    </Box>
  );
};

export default PacienteInfoFields; 