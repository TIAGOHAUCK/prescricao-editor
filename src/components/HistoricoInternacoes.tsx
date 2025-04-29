import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { HistoricoInternacao } from '../types/prescricao';

interface HistoricoInternacoesProps {
  historico: HistoricoInternacao[];
}

const HistoricoInternacoes: React.FC<HistoricoInternacoesProps> = ({ historico }) => {
  if (historico.length === 0) {
    return null;
  }

  return (
    <Box mt={3}>
      <Paper elevation={2} sx={{ p: 2 }}>
        <Typography variant="h6" color="primary" gutterBottom>
          Histórico de Internações
        </Typography>
        <List>
          {historico.map((item, index) => (
            <React.Fragment key={item.id}>
              <ListItem>
                <ListItemText
                  primary={`Internação em ${new Date(item.data).toLocaleDateString()}`}
                  secondary={
                    <>
                      <Typography component="span" variant="body2" color="text.primary">
                        {item.descricao}
                      </Typography>
                      <br />
                      <Typography component="span" variant="body2" color="text.secondary">
                        ID: {item.id}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
              {index < historico.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default HistoricoInternacoes; 