import { Medicamento } from '../types/prescricao';
import { v4 as uuidv4 } from 'uuid';

export const viasAdministracao = ['VENOSA', 'ORAL', 'INTRAMUSCULAR', 'SUBCUTÂNEA', 'INALATÓRIA', 'RETAL'] as const;

export interface CategoriaItem {
  nome: string;
  medicamentos: Medicamento[];
}

export const medicacoesPorCategoria: CategoriaItem[] = [
  {
    nome: 'Antibióticos',
    medicamentos: [
      {
        id: uuidv4(),
        nome: 'CEFTRIAXONA',
        dosagem: '1G',
        via: 'VENOSA',
        posologia: '12/12H',
        obs: 'IN XX/XX',
        categoria: 'ANTIBIÓTICOS',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['CEFTRIAXONA'],
          dosagem: ['1G', '2G'],
          via: ['VENOSA'],
          posologia: ['12/12H', '24/24H', 'AGORA'],
          obs: ['IN XX/XX']
        }
      },
      {
        id: uuidv4(),
        nome: 'CLINDAMICINA',
        dosagem: '600MG',
        via: 'VENOSA',
        posologia: '8/8H',
        obs: '',
        categoria: 'ANTIBIÓTICOS',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['CLINDAMICINA'],
          dosagem: ['600MG'],
          via: ['VENOSA'],
          posologia: ['8/8H'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'AZITROMICINA',
        dosagem: '500MG',
        via: 'ORAL',
        posologia: '1X/DIA',
        obs: '',
        categoria: 'ANTIBIÓTICOS',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['AZITROMICINA'],
          dosagem: ['500MG'],
          via: ['ORAL'],
          posologia: ['1X/DIA'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'METRONIDAZOL',
        dosagem: '500MG',
        via: 'VENOSA',
        posologia: '12/12H',
        obs: '',
        categoria: 'ANTIBIÓTICOS',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['METRONIDAZOL'],
          dosagem: ['500MG'],
          via: ['VENOSA'],
          posologia: ['12/12H'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'LEVOFLOXACINO',
        dosagem: '500MG',
        via: 'ORAL',
        posologia: '1X/DIA',
        obs: 'IN XX/XX',
        categoria: 'ANTIBIÓTICOS',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['LEVOFLOXACINO'],
          dosagem: ['500MG'],
          via: ['ORAL'],
          posologia: ['1X/DIA'],
          obs: ['IN XX/XX']
        }
      }
    ]
  },
  {
    nome: 'Broncodilatadores',
    medicamentos: [
      {
        id: uuidv4(),
        nome: 'IPATRÓPIO',
        dosagem: '',
        via: 'INALATÓRIA',
        posologia: '4/4H',
        obs: '+5ML DE SF0,9%',
        categoria: 'INALAÇÃO',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['IPATRÓPIO'],
          dosagem: [''],
          via: ['INALATÓRIA'],
          posologia: ['4/4H', '6/6H', '8/8H'],
          obs: ['+5ML DE SF0,9%']
        }
      },
      {
        id: uuidv4(),
        nome: 'SALBUTAMOL',
        dosagem: '1 PUFFS',
        via: 'INALATÓRIA',
        posologia: '4/4H',
        obs: 'COM ESPAÇADOR',
        categoria: 'INALAÇÃO',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['SALBUTAMOL'],
          dosagem: ['1 PUFFS', '2 PUFFS', '3 PUFFS', '4 PUFFS', '5 PUFFS', '6 PUFFS'],
          via: ['INALATÓRIA'],
          posologia: ['4/4H', '6/6H', '8/8H'],
          obs: ['COM ESPAÇADOR', 'SEM ESPAÇADOR']
        }
      }
    ]
  },
  {
    nome: 'Analgésicos',
    medicamentos: [
      {
        id: uuidv4(),
        nome: 'MORFINA',
        dosagem: '5ML',
        via: 'VENOSA',
        posologia: '1 AMP+9MLAD',
        obs: 'SE DOR INTENSA',
        categoria: 'DOR INTENSA',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['MORFINA'],
          dosagem: ['5ML'],
          via: ['VENOSA'],
          posologia: ['1 AMP+9MLAD'],
          obs: ['SE DOR INTENSA', 'ACM']
        }
      },
      {
        id: uuidv4(),
        nome: 'TRAMADOL',
        dosagem: '1 AMP',
        via: 'VENOSA',
        posologia: '+SF0,09% 100 ML LENTO 12/12 H',
        obs: 'SE DOR INTENSA',
        categoria: 'DOR INTENSA',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['TRAMADOL'],
          dosagem: ['1 AMP'],
          via: ['VENOSA'],
          posologia: ['+SF0,09% 100 ML LENTO 12/12 H'],
          obs: ['SE DOR INTENSA', 'ACM']
        }
      }
    ]
  },
  {
    nome: 'Anticoagulantes',
    medicamentos: [
      {
        id: uuidv4(),
        nome: 'HEPARINA',
        dosagem: '5.000 UI',
        via: 'SUBCUTÂNEA',
        posologia: '12/12 H',
        obs: 'ACM',
        categoria: 'ANTICOAGULAÇÃO',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['HEPARINA'],
          dosagem: ['5.000 UI'],
          via: ['SUBCUTÂNEA'],
          posologia: ['12/12 H'],
          obs: ['ACM']
        }
      },
      {
        id: uuidv4(),
        nome: 'XARELTO',
        dosagem: '15MG',
        via: 'ORAL',
        posologia: '12/12 H',
        obs: '',
        categoria: 'ANTICOAGULAÇÃO',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['XARELTO'],
          dosagem: ['15MG', '20MG'],
          via: ['ORAL'],
          posologia: ['12/12 H', '1X DIA'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'AAS',
        dosagem: '100MG',
        via: 'ORAL',
        posologia: '1X DIA',
        obs: '',
        categoria: 'ANTICOAGULAÇÃO',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['AAS'],
          dosagem: ['100MG'],
          via: ['ORAL'],
          posologia: ['1X DIA'],
          obs: ['']
        }
      }
    ]
  },
  {
    nome: 'Corticoides',
    medicamentos: [
      {
        id: uuidv4(),
        nome: 'PREDNISONA',
        dosagem: '20MG',
        via: 'ORAL',
        posologia: '1X DIA, MANHÃ',
        obs: '',
        categoria: 'CORTICÓIDE',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['PREDNISONA'],
          dosagem: ['20MG', '40MG', '10MG'],
          via: ['ORAL'],
          posologia: ['1X DIA, MANHÃ'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'HIDROCORTISONA',
        dosagem: '500MG',
        via: 'VENOSA',
        posologia: '1X/DIA',
        obs: '',
        categoria: 'CORTICÓIDE',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['HIDROCORTISONA'],
          dosagem: ['500MG', '100MG'],
          via: ['VENOSA', 'INTRAMUSCULAR'],
          posologia: ['1X/DIA', '2X/DIA'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'DEXAMETASONA',
        dosagem: '1 AMP',
        via: 'VENOSA',
        posologia: '1X DIA',
        obs: '',
        categoria: 'CORTICÓIDE',
        prioridade: 'MODERADA',
        variacoes: {
          nome: ['DEXAMETASONA'],
          dosagem: ['1 AMP'],
          via: ['VENOSA', 'INTRAMUSCULAR'],
          posologia: ['1X DIA', '2X/DIA'],
          obs: ['']
        }
      }
    ]
  },
  {
    nome: 'Anti-inflamatórios',
    medicamentos: [
      {
        id: uuidv4(),
        nome: 'CETOPROFENO',
        dosagem: '1 AMP',
        via: 'VENOSA',
        posologia: '8/8H',
        obs: '',
        categoria: 'ANTI-INFLAMATÓRIO',
        prioridade: 'BAIXA',
        variacoes: {
          nome: ['CETOPROFENO'],
          dosagem: ['1 AMP'],
          via: ['VENOSA', 'INTRAMUSCULAR'],
          posologia: ['8/8H', '12/12H', 'AGORA'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'TENOXICAM',
        dosagem: '1 AMP',
        via: 'VENOSA',
        posologia: '1X DIA',
        obs: '',
        categoria: 'ANTI-INFLAMATÓRIO',
        prioridade: 'BAIXA',
        variacoes: {
          nome: ['TENOXICAM'],
          dosagem: ['1 AMP'],
          via: ['VENOSA'],
          posologia: ['1X DIA', '2X DIA'],
          obs: ['']
        }
      }
    ]
  },
  {
    nome: 'Insulinas',
    medicamentos: [
      {
        id: uuidv4(),
        nome: 'INSULINA NPH',
        dosagem: '',
        via: 'SUBCUTÂNEA',
        posologia: '',
        obs: '',
        categoria: 'INSULINA',
        prioridade: 'BAIXA',
        variacoes: {
          nome: ['INSULINA NPH'],
          dosagem: [''],
          via: ['SUBCUTÂNEA'],
          posologia: [''],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'INSULINA REGULAR',
        dosagem: '',
        via: 'SUBCUTÂNEA',
        posologia: '',
        obs: '',
        categoria: 'INSULINA',
        prioridade: 'BAIXA',
        variacoes: {
          nome: ['INSULINA REGULAR'],
          dosagem: [''],
          via: ['SUBCUTÂNEA'],
          posologia: [''],
          obs: ['']
        }
      }
    ]
  },
  {
    nome: 'Anti-hipertensivos',
    medicamentos: [
      {
        id: uuidv4(),
        nome: 'CAPTOPRIL',
        dosagem: '50MG',
        via: 'ORAL',
        posologia: '8/8H',
        obs: '12/12H',
        categoria: 'ANTI-HIPERTENSIVO',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['CAPTOPRIL'],
          dosagem: ['50MG'],
          via: ['ORAL'],
          posologia: ['8/8H', '12/12H', 'SE PA>180/100mmHg'],
          obs: ['12/12H', 'ACM']
        }
      },
      {
        id: uuidv4(),
        nome: 'LOSARTANA',
        dosagem: '50MG',
        via: 'ORAL',
        posologia: '8/8H',
        obs: '12/12H',
        categoria: 'ANTI-HIPERTENSIVO',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['LOSARTANA'],
          dosagem: ['50MG'],
          via: ['ORAL'],
          posologia: ['8/8H', '12/12H', 'SE PA>180/100mmHg'],
          obs: ['12/12H', 'ACM']
        }
      },
      {
        id: uuidv4(),
        nome: 'NIFEDIPINO',
        dosagem: '50MG',
        via: 'ORAL',
        posologia: '8/8H',
        obs: '12/12H',
        categoria: 'ANTI-HIPERTENSIVO',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['NIFEDIPINO'],
          dosagem: ['50MG'],
          via: ['ORAL'],
          posologia: ['8/8H', '12/12H', 'SE PA>180/100mmHg'],
          obs: ['12/12H', 'ACM']
        }
      },
      {
        id: uuidv4(),
        nome: 'FUROSEMIDA',
        dosagem: '1 AMP',
        via: 'ORAL',
        posologia: '8/8H',
        obs: '12/12H',
        categoria: 'ANTI-HIPERTENSIVO',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['FUROSEMIDA'],
          dosagem: ['1 AMP', '2 AMP', '1 CP'],
          via: ['ORAL'],
          posologia: ['8/8H', '12/12H', 'SE PA>180/100mmHg'],
          obs: ['12/12H', 'ACM']
        }
      },
      {
        id: uuidv4(),
        nome: 'CLONIDINA',
        dosagem: '1AMP',
        via: 'ORAL',
        posologia: '8/8H',
        obs: '12/12H',
        categoria: 'ANTI-HIPERTENSIVO',
        prioridade: 'ALTA',
        variacoes: {
          nome: ['CLONIDINA'],
          dosagem: ['1AMP'],
          via: ['ORAL'],
          posologia: ['8/8H', '12/12H', 'AGORA SE PA>180/100mmHg'],
          obs: ['12/12H', 'ACM']
        }
      }
    ]
  },
  {
    nome: 'Psicotrópicos',
    medicamentos: [
      {
        id: uuidv4(),
        nome: 'HADOL',
        dosagem: '1 AMP',
        via: 'INTRAMUSCULAR',
        posologia: '8/8H',
        obs: '',
        categoria: 'ANTI-PSICÓTICO',
        prioridade: 'BAIXA',
        variacoes: {
          nome: ['HADOL'],
          dosagem: ['1 AMP'],
          via: ['INTRAMUSCULAR'],
          posologia: ['8/8H', '12/12H', '1X DIA'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'PROMETAZINA',
        dosagem: '1 AMP',
        via: 'INTRAMUSCULAR',
        posologia: '8/8H',
        obs: '',
        categoria: 'ANTI-PSICÓTICO',
        prioridade: 'BAIXA',
        variacoes: {
          nome: ['PROMETAZINA'],
          dosagem: ['1 AMP'],
          via: ['INTRAMUSCULAR'],
          posologia: ['8/8H', '12/12H', '1X DIA'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'CLONAZEPAM',
        dosagem: '5GTS',
        via: 'ORAL',
        posologia: 'NOITE',
        obs: '',
        categoria: 'ANTI-PSICÓTICO',
        prioridade: 'BAIXA',
        variacoes: {
          nome: ['CLONAZEPAM'],
          dosagem: ['5GTS', '10GTS'],
          via: ['ORAL'],
          posologia: ['NOITE', '12/12H', '8/8H'],
          obs: ['']
        }
      },
      {
        id: uuidv4(),
        nome: 'DIAZEPAM',
        dosagem: '1 AMP',
        via: 'VENOSA',
        posologia: 'NOITE',
        obs: '',
        categoria: 'ANTI-PSICÓTICO',
        prioridade: 'BAIXA',
        variacoes: {
          nome: ['DIAZEPAM'],
          dosagem: ['1 AMP'],
          via: ['VENOSA'],
          posologia: ['NOITE', '12/12H', '8/8H'],
          obs: ['']
        }
      }
    ]
  }
];

// Lista plana de medicações para autocomplete
export const medicacoesPadrao: Medicamento[] = medicacoesPorCategoria.reduce((acc, categoria) => {
  return [...acc, ...categoria.medicamentos];
}, [] as Medicamento[]); 