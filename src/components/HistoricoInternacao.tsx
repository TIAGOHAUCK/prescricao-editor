import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, IconButton } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { HistoricoInternacao as HistoricoInternacaoType } from '../types/prescricao';
import { obterHistorico, adicionarInternacao, atualizarInternacao, removerInternacao } from '../services/historicoService';

interface HistoricoInternacaoProps {
  pacienteId: string;
}

export const HistoricoInternacao: React.FC<HistoricoInternacaoProps> = ({ pacienteId }) => {
  const [historico, setHistorico] = useState<HistoricoInternacaoType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    data: '',
    descricao: ''
  });

  useEffect(() => {
    const carregarHistorico = async () => {
      const historicoPaciente = await obterHistorico(pacienteId);
      setHistorico(historicoPaciente);
    };
    carregarHistorico();
  }, [pacienteId]);

  const handleOpenDialog = (internacao?: HistoricoInternacaoType) => {
    if (internacao) {
      setEditingId(internacao.id);
      setFormData({
        data: internacao.data,
        descricao: internacao.descricao
      });
    } else {
      setEditingId(null);
      setFormData({
        data: '',
        descricao: ''
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setFormData({
      data: '',
      descricao: ''
    });
  };

  const handleSubmit = async () => {
    if (editingId) {
      await atualizarInternacao(editingId, formData);
    } else {
      await adicionarInternacao({
        ...formData,
        pacienteId
      });
    }
    const historicoAtualizado = await obterHistorico(pacienteId);
    setHistorico(historicoAtualizado);
    handleCloseDialog();
  };

  const handleDelete = async (id: string) => {
    await removerInternacao(id);
    const historicoAtualizado = await obterHistorico(pacienteId);
    setHistorico(historicoAtualizado);
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">Histórico de Internações</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
          Adicionar Internação
        </Button>
      </Box>

      {historico.map((internacao) => (
        <Box key={internacao.id} mb={2} p={2} border="1px solid #ccc" borderRadius={1}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1">
              {internacao.data} - {internacao.descricao}
            </Typography>
            <Box>
              <IconButton onClick={() => handleOpenDialog(internacao)}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(internacao.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      ))}

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>
          {editingId ? 'Editar Internação' : 'Nova Internação'}
        </DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Data"
            value={formData.data}
            onChange={(e) => setFormData({ ...formData, data: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Descrição"
            value={formData.descricao}
            onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
            margin="normal"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} color="primary">
            {editingId ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}; 