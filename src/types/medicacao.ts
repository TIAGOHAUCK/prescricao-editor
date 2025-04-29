import { CategoriaType } from './categorias';

export interface Medicacao {
  id: string;
  nome: string;
  categoria: CategoriaType;
  dosagem: string;
  via: string;
  posologia: string;
  observacoes: string;
  dataCriacao: string;
  dataUltimaEdicao?: string;
  historico: {
    tipo: 'criacao' | 'edicao' | 'remocao';
    data: string;
    detalhes: string;
  }[];
} 