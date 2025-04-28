import React from 'react';
import { Box, TextField, IconButton, Grid, MenuItem } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { FormData, Medicamento } from '../types/prescricao';

interface MedicamentoRowProps {
  medicamento: Medicamento;
  index: number;
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
  onRemoveMedicamento: (index: number) => void;
}

const MedicamentoRow: React.FC<MedicamentoRowProps> = ({
  medicamento,
  index,
  control,
  errors,
  onRemoveMedicamento
}) => {
  const handleObsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === 'OBSERVAÇÃO') {
      e.target.value = '';
    }
  };

  // Função para formatar a data atual no formato DD/MM
  const getDataAtual = () => {
    const hoje = new Date();
    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    return `${dia}/${mes}`;
  };

  // Verifica se é um antibiótico e se a observação contém "IN XX/XX"
  const isAntibiotico = medicamento.categoria === 'ANTIBIÓTICOS';
  const obsContemIn = medicamento.obs?.includes('IN XX/XX');

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <TextField
            fullWidth
            label="Nome"
            value={medicamento.nome}
            disabled
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              '& .MuiInputLabel-root': {
                transform: 'translate(14px, -9px) scale(0.75)',
              },
              '& .MuiInputBase-root': {
                marginTop: '16px',
              }
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name={`medicamentos.${index}.dosagem`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select={!!medicamento.variacoes?.dosagem}
                fullWidth
                label="Dosagem"
                error={!!errors.medicamentos?.[index]?.dosagem}
                helperText={errors.medicamentos?.[index]?.dosagem?.message}
                disabled={!medicamento.variacoes?.dosagem}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
                  '& .MuiInputBase-root': {
                    marginTop: '16px',
                  }
                }}
              >
                {medicamento.variacoes?.dosagem?.map((dosagem) => (
                  <MenuItem key={dosagem} value={dosagem}>
                    {dosagem}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name={`medicamentos.${index}.via`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select={!!medicamento.variacoes?.via}
                fullWidth
                label="Via"
                error={!!errors.medicamentos?.[index]?.via}
                helperText={errors.medicamentos?.[index]?.via?.message}
                disabled={!medicamento.variacoes?.via}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
                  '& .MuiInputBase-root': {
                    marginTop: '16px',
                  }
                }}
              >
                {medicamento.variacoes?.via?.map((via) => (
                  <MenuItem key={via} value={via}>
                    {via}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name={`medicamentos.${index}.posologia`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                select={!!medicamento.variacoes?.posologia}
                fullWidth
                label="Posologia"
                error={!!errors.medicamentos?.[index]?.posologia}
                helperText={errors.medicamentos?.[index]?.posologia?.message}
                disabled={!medicamento.variacoes?.posologia}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
                  '& .MuiInputBase-root': {
                    marginTop: '16px',
                  }
                }}
              >
                {medicamento.variacoes?.posologia?.map((posologia) => (
                  <MenuItem key={posologia} value={posologia}>
                    {posologia}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Grid>
        <Grid item xs={2}>
          <Controller
            name={`medicamentos.${index}.obs`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Observações"
                error={!!errors.medicamentos?.[index]?.obs}
                helperText={errors.medicamentos?.[index]?.obs?.message}
                onChange={(e) => {
                  handleObsChange(e as React.ChangeEvent<HTMLInputElement>);
                  field.onChange(e);
                }}
                value={isAntibiotico && obsContemIn ? `IN ${getDataAtual()}` : field.value}
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  '& .MuiInputLabel-root': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
                  '& .MuiInputBase-root': {
                    marginTop: '16px',
                  }
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={1}>
          <IconButton 
            color="error" 
            onClick={() => onRemoveMedicamento(index)}
            sx={{ mt: 3 }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MedicamentoRow; 