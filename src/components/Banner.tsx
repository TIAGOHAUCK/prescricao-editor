import React from 'react';
import { Box } from '@mui/material';
import bannerImage from '../assets/banner.png';

const Banner: React.FC = () => {
  console.log('Tentando carregar banner de:', bannerImage);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1.5rem',
        backgroundColor: 'transparent'
      }}
    >
      <Box
        component="img"
        src={bannerImage}
        alt="Editor Prontuário - Hospital Dr. Aurélio"
        sx={{
          width: '100%',
          maxWidth: '780px',
          height: 'auto',
          objectFit: 'contain'
        }}
        onError={(e) => {
          console.error('Erro ao carregar imagem:', e);
        }}
      />
    </Box>
  );
};

export default Banner; 