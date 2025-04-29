import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Collapse,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  SelectChangeEvent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Medicacao } from '../types/medicacao';
import { medicacaoService } from '../services/medicacaoService';
import { CATEGORIAS, CATEGORIAS_LIST, CategoriaType } from '../types/categorias';

type TipoHistorico = 'criacao' | 'edicao' | 'remocao';

interface HistoricoItem {
  tipo: TipoHistorico;
  data: string;
  medicacaoId: string;
  medicacaoNome: string;
  detalhes: string;
  medicacaoCompleta?: Medicacao;
}

const MedicacaoManager: React.FC = () => {
  const [medicacoes, setMedicacoes] = useState<Medicacao[]>([]);
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMedicacao, setEditingMedicacao] = useState<Medicacao | null>(null);
  const [expandedItems, setExpandedItems] = useState<{ [key: string]: boolean }>({});
  const [expandedCategorias, setExpandedCategorias] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<Medicacao>({
    id: '',
    nome: '',
    categoria: CATEGORIAS.ANTI_HIPERTENSIVOS,
    dosagem: '',
    via: '',
    posologia: '',
    observacoes: '',
    dataCriacao: new Date().toISOString(),
    historico: []
  });

  useEffect(() => {
    loadMedicacoes();
    loadHistorico();
  }, []);

  const loadMedicacoes = () => {
    const medicacoesData = medicacaoService.getAll();
    setMedicacoes(medicacoesData);
  };

  const loadHistorico = () => {
    const historicoData = medicacaoService.getHistorico();
    setHistorico(historicoData);
  };

  const handleOpenDialog = (medicacao?: Medicacao) => {
    if (medicacao) {
      setEditingMedicacao(medicacao);
      setFormData(medicacao);
    } else {
      setEditingMedicacao(null);
      setFormData({
        id: '',
        nome: '',
        categoria: CATEGORIAS.ANTI_HIPERTENSIVOS,
        dosagem: '',
        via: '',
        posologia: '',
        observacoes: '',
        dataCriacao: new Date().toISOString(),
        historico: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMedicacao(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'categoria') {
      setFormData(prev => ({
        ...prev,
        categoria: value as CategoriaType
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  const handleCategoriaChange = (e: SelectChangeEvent<CategoriaType>) => {
    const value = e.target.value;
    if (CATEGORIAS_LIST.includes(value as CategoriaType)) {
      setFormData(prev => ({
        ...prev,
        categoria: value as CategoriaType
      }));
    }
  };

  const handleSubmit = () => {
    if (editingMedicacao) {
      medicacaoService.update(formData);
    } else {
      const newMedicacao = { ...formData, id: Date.now().toString() };
      medicacaoService.add(newMedicacao);
    }
    loadMedicacoes();
    loadHistorico();
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    medicacaoService.delete(id);
    loadMedicacoes();
    loadHistorico();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const getChipColor = (tipo: TipoHistorico) => {
    switch (tipo) {
      case 'criacao':
        return 'success';
      case 'edicao':
        return 'info';
      case 'remocao':
        return 'error';
      default:
        return 'default';
    }
  };

  const toggleExpand = (index: number) => {
    setExpandedItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const toggleCategoria = (categoria: string) => {
    setExpandedCategorias(prev => ({
      ...prev,
      [categoria]: !prev[categoria]
    }));
  };

  const medicacoesPorCategoria = medicacoes.reduce((acc, medicacao) => {
    if (!acc[medicacao.categoria]) {
      acc[medicacao.categoria] = [];
    }
    acc[medicacao.categoria].push(medicacao);
    return acc;
  }, {} as { [key: string]: Medicacao[] });

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" component="h2">
          Gerenciar Medicações
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Nova Medicação
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        {CATEGORIAS_LIST.map((categoria) => (
          <Accordion
            key={categoria}
            expanded={expandedCategorias[categoria]}
            onChange={() => toggleCategoria(categoria)}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>
                {categoria} ({medicacoesPorCategoria[categoria]?.length || 0})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Dosagem</TableCell>
                      <TableCell>Via</TableCell>
                      <TableCell>Posologia</TableCell>
                      <TableCell>Observações</TableCell>
                      <TableCell align="right">Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medicacoesPorCategoria[categoria]?.map((medicacao) => (
                      <TableRow key={medicacao.id}>
                        <TableCell>{medicacao.nome}</TableCell>
                        <TableCell>{medicacao.dosagem}</TableCell>
                        <TableCell>{medicacao.via}</TableCell>
                        <TableCell>{medicacao.posologia}</TableCell>
                        <TableCell>{medicacao.observacoes}</TableCell>
                        <TableCell align="right">
                          <IconButton onClick={() => handleOpenDialog(medicacao)} color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(medicacao.id)} color="error">
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        Histórico de Alterações
      </Typography>

      <Paper sx={{ maxHeight: 600, overflow: 'auto' }}>
        <List>
          {historico.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={() => toggleExpand(index)}
                sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Chip
                      label={item.tipo.toUpperCase()}
                      color={getChipColor(item.tipo)}
                      size="small"
                    />
                    <Typography variant="body1">
                      {item.medicacaoNome}
                    </Typography>
                  </Box>
                  <IconButton size="small">
                    {expandedItems[index] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </IconButton>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {item.detalhes}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {formatDate(item.data)}
                </Typography>
              </ListItem>
              <Collapse in={expandedItems[index]} timeout="auto" unmountOnExit>
                <Box sx={{ p: 2, bgcolor: 'background.default' }}>
                  {item.medicacaoCompleta && (
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Typography variant="subtitle2" color="primary">
                          Detalhes da Medicação
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Nome:</strong> {item.medicacaoCompleta.nome}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Categoria:</strong> {item.medicacaoCompleta.categoria}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Dosagem:</strong> {item.medicacaoCompleta.dosagem}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Via:</strong> {item.medicacaoCompleta.via}
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body2">
                          <strong>Posologia:</strong> {item.medicacaoCompleta.posologia}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>Observações:</strong> {item.medicacaoCompleta.observacoes}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          <strong>Data de Criação:</strong> {formatDate(item.medicacaoCompleta.dataCriacao)}
                        </Typography>
                      </Grid>
                      {item.medicacaoCompleta.dataUltimaEdicao && (
                        <Grid item xs={12}>
                          <Typography variant="body2">
                            <strong>Última Edição:</strong> {formatDate(item.medicacaoCompleta.dataUltimaEdicao)}
                          </Typography>
                        </Grid>
                      )}
                    </Grid>
                  )}
                </Box>
              </Collapse>
              {index < historico.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingMedicacao ? 'Editar Medicação' : 'Nova Medicação'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="nome"
              label="Nome da Medicação"
              value={formData.nome}
              onChange={handleInputChange}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                name="categoria"
                value={formData.categoria}
                onChange={handleCategoriaChange}
                label="Categoria"
              >
                {CATEGORIAS_LIST.map((categoria) => (
                  <MenuItem key={categoria} value={categoria}>
                    {categoria}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              name="dosagem"
              label="Dosagem"
              value={formData.dosagem}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="via"
              label="Via de Administração"
              value={formData.via}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="posologia"
              label="Posologia"
              value={formData.posologia}
              onChange={handleInputChange}
              fullWidth
              placeholder="Ex: 8/8H, 12/12H, 1X/DIA"
            />
            <TextField
              name="observacoes"
              label="Observações"
              value={formData.observacoes}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingMedicacao ? 'Salvar' : 'Adicionar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MedicacaoManager; 