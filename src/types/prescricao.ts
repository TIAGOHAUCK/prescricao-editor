import { viasAdministracao } from '../data/medicacoesDB';

export interface Medicamento {
  id: string;
  nome: string;
  dosagem: string;
  via: string;
  posologia: string;
  obs?: string;
  categoria?: string;
  prioridade?: 'ALTA' | 'MODERADA' | 'BAIXA';
  variacoes?: {
    nome?: string[];
    dosagem?: string[];
    via?: string[];
    posologia?: string[];
    obs?: string[];
  };
}

export interface MedicamentoFixo {
  id: string;
  ordem: number;
  nome: string;
  dosagem: string;
  via: string;
  posologia: string;
  obs?: string;
  categoria: string;
  prioridade: 'ALTA' | 'MODERADA' | 'BAIXA';
  variacoes?: {
    nome?: string[];
    dosagem?: string[];
    via?: string[];
    posologia?: string[];
    obs?: string[];
  };
}

export interface PrescricaoData {
  nomePaciente: string;
  idade: string;
  dataInternacao: string;
  dataHoje: string;
  diagnostico: string;
  alergias: string;
  origem: string;
  admissao: string;
  comorbidades: string;
  muc: string;
  exameFisico: string;
  analise: string;
  condutas: string;
  medicamentos: Medicamento[];
}

export interface HistoricoInternacao {
  id: string;
  pacienteId: string;
  data: string;
  descricao: string;
}

export interface HistoricoPaciente {
  nomePaciente: string;
  idade: string;
  internacoes: HistoricoInternacao[];
}

export interface FormData {
  nomePaciente: string;
  idade: number;
  dih: string;
  dataHoje: string;
  diagnostico: string;
  alergias: string;
  origem: string;
  admissao: string;
  comorbidades: string;
  muc: string;
  exameFisico: string;
  analise: string;
  condutas: string;
  medicamentos: Medicamento[];
}

export type ViaAdministracao = typeof viasAdministracao[number]; 