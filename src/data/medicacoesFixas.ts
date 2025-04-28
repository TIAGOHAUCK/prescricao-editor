import { MedicamentoFixo } from '../types/prescricao';
import { v4 as uuidv4 } from 'uuid';

export const medicacoesFixas: MedicamentoFixo[] = [
  {
    id: uuidv4(),
    ordem: 1,
    nome: 'DIETA LIVRE',
    dosagem: '-',
    via: 'ORAL',
    posologia: '8/8H',
    obs: '',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const,
    variacoes: {
      nome: ['DIETA LIVRE'],
      via: ['ORAL']
    }
  },
  {
    id: uuidv4(),
    ordem: 2,
    nome: 'CRSV + S02',
    dosagem: '-',
    via: '-',
    posologia: '6/6H',
    obs: '',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const
  },
  {
    id: uuidv4(),
    ordem: 3,
    nome: 'CONTROLE E HGT',
    dosagem: '-',
    via: 'ORAL',
    posologia: '12/12H',
    obs: '',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const
  },
  {
    id: uuidv4(),
    ordem: 4,
    nome: 'AVP SALINIZADO',
    dosagem: '-',
    via: 'VENOSA',
    posologia: '24/24H',
    obs: '',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const
  },
  {
    id: uuidv4(),
    ordem: 5,
    nome: 'O2 ÚMIDO EM CATETER NASAL',
    dosagem: '3L/MIN',
    via: 'INALATÓRIA',
    posologia: 'SE SATO2 <93% AA',
    obs: 'ALVO SATO2 94-96%',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const,
    variacoes: {
      dosagem: ['1L/MIN', '2L/MIN', '3L/MIN', '4L/MIN', '5L/MIN']
    }
  },
  {
    id: uuidv4(),
    ordem: 6,
    nome: 'SORO FISIOLÓGICO 0,9%',
    dosagem: '500ML',
    via: 'VENOSA',
    posologia: '12/12H',
    obs: '',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const,
    variacoes: {
      nome: ['SORO FISIOLÓGICO 0,9%', 'RINGER LACTATO'],
      dosagem: ['100ML', '250ML', '500ML', '1000ML'],
      posologia: ['6/6H', '8/8H', '12/12H', '24/24H']
    }
  },
  {
    id: uuidv4(),
    ordem: 7,
    nome: 'DIPIRONA',
    dosagem: '1 AMP',
    via: 'VENOSA',
    posologia: '6/6H',
    obs: 'SE DOR OU Tax >37,5ºC',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const,
    variacoes: {
      nome: ['DIPIRONA', 'PARACETAMOL'],
      dosagem: ['1 AMP', '1 CP'],
      via: ['VENOSA', 'ORAL']
    }
  },
  {
    id: uuidv4(),
    ordem: 8,
    nome: 'ONDASETRONA',
    dosagem: '1 AMP',
    via: 'VENOSA',
    posologia: '8/8H',
    obs: 'SE NÁUSEA OU VÔMITOS',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const,
    variacoes: {
      nome: ['ONDASETRONA', 'BROMIPRIDA', 'PLASIL']
    }
  },
  {
    id: uuidv4(),
    ordem: 9,
    nome: 'GLICOSE 50%',
    dosagem: '2 AMP',
    via: 'VENOSA',
    posologia: 'SE HGT<70',
    obs: 'ATENÇÃO',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const
  },
  {
    id: uuidv4(),
    ordem: 10,
    nome: 'INSULINA REGULAR',
    dosagem: 'AVALIAR HGT',
    via: 'SUBCUTÂNEA',
    posologia: 'Até 180 = 0 unidades;\n181-200 = 2 unidades;\n201-250 = 4 unidades;\n251-300 = 6 unidades;\n301-350 = 8 unidades;\n351-400 = 10 unidades;\nSe >400 ou <60 AVISAR',
    obs: 'ATENÇÃO',
    categoria: 'ROTINA',
    prioridade: 'ALTA' as const
  },
  {
    id: uuidv4(),
    ordem: 11,
    nome: 'CEFTRIAXONA',
    dosagem: '1G',
    via: 'VENOSA',
    posologia: '12/12H',
    obs: 'IN XX/XX',
    categoria: 'ANTIBIÓTICOS',
    prioridade: 'ALTA' as const,
    variacoes: {
      dosagem: ['1G', '2G'],
      posologia: ['12/12H', '24/24H', 'AGORA']
    }
  },
  {
    id: uuidv4(),
    ordem: 12,
    nome: 'CLINDAMICINA',
    dosagem: '600MG',
    via: 'VENOSA',
    posologia: '8/8H',
    obs: 'IN XX/XX',
    categoria: 'ANTIBIÓTICOS',
    prioridade: 'ALTA' as const
  },
  {
    id: uuidv4(),
    ordem: 13,
    nome: 'AZITROMICINA',
    dosagem: '500MG',
    via: 'ORAL',
    posologia: '1X/DIA',
    obs: 'IN XX/XX',
    categoria: 'ANTIBIÓTICOS',
    prioridade: 'ALTA' as const
  },
  {
    id: uuidv4(),
    ordem: 14,
    nome: 'METRONIDAZOL',
    dosagem: '500MG',
    via: 'VENOSA',
    posologia: '12/12H',
    obs: 'IN XX/XX',
    categoria: 'ANTIBIÓTICOS',
    prioridade: 'ALTA' as const
  },
  {
    id: uuidv4(),
    ordem: 15,
    nome: 'LEVOFLOXACINO',
    dosagem: '500MG',
    via: 'ORAL',
    posologia: '1X/DIA',
    obs: 'IN XX/XX',
    categoria: 'ANTIBIÓTICOS',
    prioridade: 'ALTA' as const
  },
  {
    id: uuidv4(),
    ordem: 16,
    nome: 'IPATRÓPIO',
    dosagem: '',
    via: 'INALATÓRIA',
    posologia: '4/4H',
    obs: '+5ML DE SF0,9%',
    categoria: 'INALAÇÃO',
    prioridade: 'MODERADA' as const,
    variacoes: {
      posologia: ['4/4H', '6/6H', '8/8H']
    }
  },
  {
    id: uuidv4(),
    ordem: 17,
    nome: 'SALBUTAMOL',
    dosagem: '1 PUFFS',
    via: 'INALATÓRIA',
    posologia: '4/4H',
    obs: 'COM ESPAÇADOR',
    categoria: 'INALAÇÃO',
    prioridade: 'MODERADA' as const,
    variacoes: {
      dosagem: ['1 PUFFS', '2 PUFFS', '3 PUFFS', '4 PUFFS', '5 PUFFS', '6 PUFFS'],
      posologia: ['4/4H', '6/6H', '8/8H'],
      obs: ['COM ESPAÇADOR', 'SEM ESPAÇADOR']
    }
  },
  {
    id: uuidv4(),
    ordem: 18,
    nome: 'MORFINA',
    dosagem: '5ML',
    via: 'VENOSA',
    posologia: '1 AMP+9MLAD',
    obs: 'SE DOR INTENSA / ACM',
    categoria: 'DOR INTENSA',
    prioridade: 'MODERADA' as const
  },
  {
    id: uuidv4(),
    ordem: 19,
    nome: 'TRAMADOL',
    dosagem: '1 AMP',
    via: 'VENOSA',
    posologia: '+SF0,09% 100 ML LENTO 12/12 H',
    obs: 'SE DOR INTENSA / ACM',
    categoria: 'DOR INTENSA',
    prioridade: 'MODERADA' as const
  },
  {
    id: uuidv4(),
    ordem: 20,
    nome: 'HEPARINA',
    dosagem: '5.000 UI',
    via: 'SUBCUTÂNEA',
    posologia: '12/12 H',
    obs: 'ACM',
    categoria: 'ANTICOAGULAÇÃO',
    prioridade: 'MODERADA' as const
  },
  {
    id: uuidv4(),
    ordem: 21,
    nome: 'XARELTO',
    dosagem: '15MG',
    via: 'ORAL',
    posologia: '12/12 H',
    obs: '',
    categoria: 'ANTICOAGULAÇÃO',
    prioridade: 'MODERADA' as const,
    variacoes: {
      dosagem: ['15MG', '20MG'],
      posologia: ['12/12 H', '1X DIA']
    }
  },
  {
    id: uuidv4(),
    ordem: 22,
    nome: 'AAS',
    dosagem: '100MG',
    via: 'ORAL',
    posologia: '1X DIA',
    obs: '',
    categoria: 'ANTICOAGULAÇÃO',
    prioridade: 'MODERADA' as const
  },
  {
    id: uuidv4(),
    ordem: 23,
    nome: 'PREDNISONA',
    dosagem: '20MG',
    via: 'ORAL',
    posologia: '1X DIA, MANHÃ',
    obs: '',
    categoria: 'CORTICÓIDE',
    prioridade: 'MODERADA' as const,
    variacoes: {
      dosagem: ['20MG', '40MG', '10MG']
    }
  },
  {
    id: uuidv4(),
    ordem: 24,
    nome: 'HIDROCORTISONA',
    dosagem: '500MG',
    via: 'VENOSA',
    posologia: '1X/DIA',
    obs: '',
    categoria: 'CORTICÓIDE',
    prioridade: 'MODERADA' as const,
    variacoes: {
      dosagem: ['500MG', '100MG'],
      via: ['VENOSA', 'INTRAMUSCULAR'],
      posologia: ['1X/DIA', '2X/DIA']
    }
  },
  {
    id: uuidv4(),
    ordem: 25,
    nome: 'DEXAMETASONA',
    dosagem: '1 AMP',
    via: 'VENOSA',
    posologia: '1X DIA',
    obs: '',
    categoria: 'CORTICÓIDE',
    prioridade: 'MODERADA' as const,
    variacoes: {
      via: ['VENOSA', 'INTRAMUSCULAR'],
      posologia: ['1X DIA', '2X/DIA']
    }
  },
  {
    id: uuidv4(),
    ordem: 26,
    nome: 'CETOPROFENO',
    dosagem: '1 AMP',
    via: 'VENOSA',
    posologia: '8/8H',
    obs: '',
    categoria: 'ANTI-INFLAMATÓRIO',
    prioridade: 'BAIXA' as const,
    variacoes: {
      via: ['VENOSA', 'INTRAMUSCULAR'],
      posologia: ['8/8H', '12/12H', 'AGORA']
    }
  },
  {
    id: uuidv4(),
    ordem: 27,
    nome: 'TENOXICAM',
    dosagem: '1 AMP',
    via: 'VENOSA',
    posologia: '1X DIA',
    obs: '',
    categoria: 'ANTI-INFLAMATÓRIO',
    prioridade: 'BAIXA' as const,
    variacoes: {
      posologia: ['1X DIA', '2X DIA']
    }
  },
  {
    id: uuidv4(),
    ordem: 28,
    nome: 'INSULINA NPH',
    dosagem: '',
    via: 'SUBCUTÂNEA',
    posologia: '',
    obs: '',
    categoria: 'INSULINA',
    prioridade: 'BAIXA' as const
  },
  {
    id: uuidv4(),
    ordem: 29,
    nome: 'CAPTOPRIL',
    dosagem: '50MG',
    via: 'ORAL',
    posologia: '8/8H',
    obs: '12/12H / ACM',
    categoria: 'ANTIHIPERTENSIVOS',
    prioridade: 'ALTA' as const,
    variacoes: {
      posologia: ['8/8H', '12/12H', 'SE PA>180/100mmHg']
    }
  },
  {
    id: uuidv4(),
    ordem: 30,
    nome: 'HADOL',
    dosagem: '1 AMP',
    via: 'INTRAMUSCULAR',
    posologia: '8/8H',
    obs: '',
    categoria: 'ANTIPSICÓTICO',
    prioridade: 'BAIXA' as const,
    variacoes: {
      posologia: ['8/8H', '12/12H', '1X DIA']
    }
  },
  {
    id: uuidv4(),
    ordem: 31,
    nome: 'PROMETAZINA',
    dosagem: '1 AMP',
    via: 'INTRAMUSCULAR',
    posologia: '8/8H',
    obs: '',
    categoria: 'ANTIPSICÓTICO',
    prioridade: 'BAIXA' as const,
    variacoes: {
      posologia: ['8/8H', '12/12H', '1X DIA']
    }
  },
  {
    id: uuidv4(),
    ordem: 32,
    nome: 'CLONAZEPAM',
    dosagem: '5GTS',
    via: 'ORAL',
    posologia: 'NOITE',
    obs: '',
    categoria: 'ANTIPSICÓTICO',
    prioridade: 'BAIXA' as const,
    variacoes: {
      dosagem: ['5GTS', '10GTS'],
      posologia: ['NOITE', '12/12H', '8/8H']
    }
  },
  {
    id: uuidv4(),
    ordem: 33,
    nome: 'DIAZEPAM',
    dosagem: '1 AMP',
    via: 'VENOSA',
    posologia: 'NOITE',
    obs: '',
    categoria: 'ANTIPSICÓTICO',
    prioridade: 'BAIXA' as const,
    variacoes: {
      posologia: ['NOITE', '12/12H', '8/8H']
    }
  }
]; 