import { Medicacao } from '../types/medicacao';

const STORAGE_KEY = 'medicacoes';
const HISTORICO_KEY = 'medicacoes_historico';
const SHARED_MEDICACOES_KEY = 'medicacoes_compartilhadas';

type TipoHistorico = 'criacao' | 'edicao' | 'remocao';

interface HistoricoItem {
  tipo: TipoHistorico;
  data: string;
  medicacaoId: string;
  medicacaoNome: string;
  detalhes: string;
  medicacaoCompleta?: Medicacao;
}

export const medicacaoService = {
  getAll: (): Medicacao[] => {
    const medicacoes = localStorage.getItem(STORAGE_KEY);
    return medicacoes ? JSON.parse(medicacoes) : [];
  },

  getHistorico: (): HistoricoItem[] => {
    const historico = localStorage.getItem(HISTORICO_KEY);
    return historico ? JSON.parse(historico) : [];
  },

  add: (medicacao: Medicacao): void => {
    const medicacoes = medicacaoService.getAll();
    const now = new Date().toISOString();
    const novaMedicacao: Medicacao = {
      ...medicacao,
      dataCriacao: now,
      historico: [{
        tipo: 'criacao' as TipoHistorico,
        data: now,
        detalhes: 'Medicação adicionada ao sistema'
      }]
    };
    medicacoes.push(novaMedicacao);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(medicacoes));

    // Adiciona ao histórico geral
    const historico = medicacaoService.getHistorico();
    historico.unshift({
      tipo: 'criacao',
      data: now,
      medicacaoId: novaMedicacao.id,
      medicacaoNome: novaMedicacao.nome,
      detalhes: 'Medicação adicionada ao sistema',
      medicacaoCompleta: novaMedicacao
    });
    localStorage.setItem(HISTORICO_KEY, JSON.stringify(historico));
  },

  update: (medicacao: Medicacao): void => {
    const medicacoes = medicacaoService.getAll();
    const index = medicacoes.findIndex(m => m.id === medicacao.id);
    if (index !== -1) {
      const now = new Date().toISOString();
      const medicacaoAtualizada: Medicacao = {
        ...medicacao,
        dataUltimaEdicao: now,
        historico: [
          ...medicacao.historico,
          {
            tipo: 'edicao' as TipoHistorico,
            data: now,
            detalhes: 'Medicação atualizada'
          }
        ]
      };
      medicacoes[index] = medicacaoAtualizada;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(medicacoes));

      // Adiciona ao histórico geral
      const historico = medicacaoService.getHistorico();
      historico.unshift({
        tipo: 'edicao',
        data: now,
        medicacaoId: medicacao.id,
        medicacaoNome: medicacao.nome,
        detalhes: 'Medicação atualizada',
        medicacaoCompleta: medicacaoAtualizada
      });
      localStorage.setItem(HISTORICO_KEY, JSON.stringify(historico));
    }
  },

  delete: (id: string): void => {
    const medicacoes = medicacaoService.getAll();
    const medicacaoParaRemover = medicacoes.find(m => m.id === id);
    if (medicacaoParaRemover) {
      const now = new Date().toISOString();
      const filteredMedicacoes = medicacoes.filter(m => m.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredMedicacoes));

      // Adiciona ao histórico geral
      const historico = medicacaoService.getHistorico();
      historico.unshift({
        tipo: 'remocao',
        data: now,
        medicacaoId: id,
        medicacaoNome: medicacaoParaRemover.nome,
        detalhes: 'Medicação removida do sistema',
        medicacaoCompleta: medicacaoParaRemover
      });
      localStorage.setItem(HISTORICO_KEY, JSON.stringify(historico));
    }
  }
}; 