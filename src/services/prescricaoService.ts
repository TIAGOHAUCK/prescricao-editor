import { PrescricaoData } from '../types/prescricao';
import { generatePrescricao } from './docxService';

export const gerarPrescricao = async (data: PrescricaoData): Promise<boolean> => {
  try {
    const blob = await generatePrescricao(data);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const dataFormatada = data.dataHoje.replace(/\//g, '-');
    link.download = `prescricao_${data.nomePaciente}_${dataFormatada}.docx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Erro ao gerar prescrição:', error);
    return false;
  }
};

export const gerarPrescricaoService = async (formData: PrescricaoData): Promise<void> => {
  try {
    const sucesso = await gerarPrescricao(formData);
    if (!sucesso) {
      throw new Error('Falha ao gerar prescrição');
    }
  } catch (error) {
    console.error('Erro ao gerar prescrição:', error);
    throw error;
  }
}; 