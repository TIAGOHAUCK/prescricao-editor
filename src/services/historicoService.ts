import { HistoricoInternacao } from '../types/prescricao';

// Banco de dados em memória
let historicoDB: HistoricoInternacao[] = [];

export const obterHistorico = async (pacienteId: string): Promise<HistoricoInternacao[]> => {
  return historicoDB.filter(item => item.pacienteId === pacienteId);
};

export const adicionarInternacao = async (internacao: Omit<HistoricoInternacao, 'id'>): Promise<HistoricoInternacao> => {
  const novaInternacao: HistoricoInternacao = {
    ...internacao,
    id: Date.now().toString()
  };
  historicoDB.push(novaInternacao);
  return novaInternacao;
};

export const atualizarInternacao = async (id: string, dados: Partial<HistoricoInternacao>): Promise<HistoricoInternacao | null> => {
  const index = historicoDB.findIndex(item => item.id === id);
  if (index === -1) return null;
  
  const atualizado = {
    ...historicoDB[index],
    ...dados
  };
  historicoDB[index] = atualizado;
  return atualizado;
};

export const removerInternacao = async (id: string): Promise<boolean> => {
  const index = historicoDB.findIndex(item => item.id === id);
  if (index === -1) return false;
  
  historicoDB.splice(index, 1);
  return true;
};

export const limparHistorico = (): void => {
  historicoDB = [];
};

export const buscarInternacoes = async (pacienteId: string): Promise<HistoricoInternacao[]> => {
  try {
    const response = await fetch(`/api/historico/${pacienteId}`);
    if (!response.ok) {
      throw new Error('Erro ao buscar histórico de internações');
    }
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    throw error;
  }
}; 