import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PrescricaoForm from '../PrescricaoForm';
import { usePrescricaoForm } from '../../hooks/usePrescricaoForm';

// Mock do hook usePrescricaoForm
jest.mock('../../hooks/usePrescricaoForm', () => ({
  usePrescricaoForm: () => ({
    control: {},
    errors: {},
    isLoading: false,
    alert: { open: false, message: '', severity: 'success' },
    setAlert: jest.fn(),
    handleSubmit: jest.fn(),
    handleAddMedicamento: jest.fn(),
    handleRemoveMedicamento: jest.fn(),
    formData: { medicamentos: [] },
    setFormData: jest.fn(),
    handleAddAllFixedMedications: jest.fn(),
  }),
}));

describe('PrescricaoForm', () => {
  it('deve renderizar o título da prescrição', () => {
    render(<PrescricaoForm />);
    const titleElement = screen.getByText('Prescrição Médica');
    expect(titleElement).toBeInTheDocument();
  });

  it('deve renderizar o botão de adicionar medicamento', () => {
    render(<PrescricaoForm />);
    const addButton = screen.getByText('Adicionar Medicamento');
    expect(addButton).toBeInTheDocument();
  });

  it('deve renderizar o botão de adicionar rotina', () => {
    render(<PrescricaoForm />);
    const addRoutineButton = screen.getByText('Adicionar Rotina');
    expect(addRoutineButton).toBeInTheDocument();
  });
}); 