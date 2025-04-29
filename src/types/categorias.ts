export const CATEGORIAS = {
  ANTI_HIPERTENSIVOS: 'Anti-hipertensivos',
  ANTIBIOTICOS: 'Antibióticos',
  ANTI_INFLAMATORIOS: 'Anti-inflamatórios',
  ANALGESICOS: 'Analgésicos',
  ANTIDIABETICOS: 'Antidiabéticos',
  ANTI_COAGULANTES: 'Anticoagulantes',
  BRONCODILATADORES: 'Broncodilatadores',
  ANTI_CONVULSIVANTES: 'Anticonvulsivantes',
  ANTI_DEPRESSIVOS: 'Antidepressivos',
  ANTI_PSICOTICOS: 'Antipsicóticos',
  ANTI_ARRITMICOS: 'Antiarrítmicos',
  ANTI_ALERGICOS: 'Antialérgicos',
  ANTI_EMETICOS: 'Antieméticos',
  ANTI_ACIDOS: 'Antiácidos',
  OUTROS: 'Outros'
} as const;

export type CategoriaType = typeof CATEGORIAS[keyof typeof CATEGORIAS];

export const CATEGORIAS_LIST = Object.values(CATEGORIAS); 