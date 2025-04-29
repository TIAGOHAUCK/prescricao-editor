import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Typography
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { medicacoesFixas } from '../data/medicacoesFixas';
import { v4 as uuidv4 } from 'uuid';
import { Medicamento } from '../types/prescricao';
import { medicacaoService } from '../services/medicacaoService';

interface MedicamentoSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (medicamento: Medicamento) => void;
}

const MedicamentoSelector: React.FC<MedicamentoSelectorProps> = ({
  open,
  onClose,
  onSelect
}) => {
  const [expandedCategory, setExpandedCategory] = React.useState<string | null>(null);
  const [medicacoesCadastradas, setMedicacoesCadastradas] = React.useState<any[]>([]);

  React.useEffect(() => {
    // Carregar medicações cadastradas
    const medicacoes = medicacaoService.getAll();
    setMedicacoesCadastradas(medicacoes);
  }, []);

  // Agrupar medicamentos por categoria
  const medicamentosPorCategoria = React.useMemo(() => {
    const todasMedicacoes = [
      ...medicacoesFixas,
      ...medicacoesCadastradas.map(med => ({
        id: med.id,
        ordem: 999, // Ordem alta para aparecer depois das fixas
        nome: med.nome,
        dosagem: med.dosagem || '',
        via: med.via || '',
        posologia: med.posologia || '',
        obs: med.observacoes || '',
        categoria: med.categoria === 'ANTIHIPERTENSIVOS' ? 'Anti-hipertensivos' : med.categoria,
        prioridade: 'BAIXA' as const,
      }))
    ];

    return todasMedicacoes.reduce((acc, med) => {
      // Normaliza a categoria de anti-hipertensivos
      let categoria = med.categoria || 'Outros';
      if (categoria === 'ANTIHIPERTENSIVOS') {
        categoria = 'Anti-hipertensivos';
      }
      
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(med);
      return acc;
    }, {} as Record<string, typeof todasMedicacoes>);
  }, [medicacoesCadastradas]);

  const handleCategoryClick = (categoria: string) => {
    setExpandedCategory(expandedCategory === categoria ? null : categoria);
  };

  const handleMedicamentoSelect = (medicamento: typeof medicacoesFixas[0]) => {
    onSelect({
      id: uuidv4(),
      nome: medicamento.nome,
      dosagem: medicamento.dosagem,
      via: medicamento.via,
      posologia: medicamento.posologia,
      obs: medicamento.obs || '',
      categoria: medicamento.categoria,
      prioridade: medicamento.prioridade,
      variacoes: medicamento.variacoes
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6">Selecionar Medicamento</Typography>
      </DialogTitle>
      <DialogContent>
        <List>
          {Object.entries(medicamentosPorCategoria).map(([categoria, medicamentos]) => (
            <React.Fragment key={categoria}>
              <ListItemButton onClick={() => handleCategoryClick(categoria)}>
                <ListItemText 
                  primary={categoria} 
                  secondary={`${medicamentos.length} medicamentos`}
                />
                {expandedCategory === categoria ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={expandedCategory === categoria} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {medicamentos.map((medicamento) => (
                    <ListItemButton
                      key={medicamento.id}
                      sx={{ pl: 4 }}
                      onClick={() => handleMedicamentoSelect(medicamento)}
                    >
                      <ListItemText
                        primary={medicamento.nome}
                        secondary={`${medicamento.dosagem} - ${medicamento.via} - ${medicamento.posologia || '-'}`}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default MedicamentoSelector; 