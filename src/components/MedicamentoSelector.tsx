import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Collapse,
  Typography,
  IconButton,
  Box
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { medicacoesFixas } from '../data/medicacoesFixas';
import { Medicamento } from '../types/prescricao';
import { v4 as uuidv4 } from 'uuid';

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

  // Agrupar medicamentos por categoria
  const medicamentosPorCategoria = React.useMemo(() => {
    return medicacoesFixas.reduce((acc, med) => {
      const categoria = med.categoria || 'Outros';
      if (!acc[categoria]) {
        acc[categoria] = [];
      }
      acc[categoria].push(med);
      return acc;
    }, {} as Record<string, typeof medicacoesFixas>);
  }, []);

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
                  {medicamentos.map((med) => (
                    <ListItemButton
                      key={med.id}
                      sx={{ pl: 4 }}
                      onClick={() => handleMedicamentoSelect(med)}
                    >
                      <ListItemText
                        primary={med.nome}
                        secondary={
                          <Box component="span">
                            <Typography variant="body2" color="text.secondary">
                              {med.dosagem} - {med.via} - {med.posologia}
                            </Typography>
                            {med.prioridade && (
                              <Typography
                                variant="caption"
                                sx={{
                                  ml: 1,
                                  color: med.prioridade === 'ALTA' ? 'error.main' :
                                        med.prioridade === 'MODERADA' ? 'warning.main' :
                                        'info.main'
                                }}
                              >
                                ({med.prioridade})
                              </Typography>
                            )}
                          </Box>
                        }
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