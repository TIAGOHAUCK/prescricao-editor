import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { FormData, Medicamento, PrescricaoData, HistoricoInternacao } from '../types/prescricao';
import { obterHistorico, adicionarInternacao } from '../services/historicoService';
import { gerarPrescricao } from '../services/prescricaoService';
import { medicacoesFixas } from '../data/medicacoesFixas';

interface UsePrescricaoFormProps {
  initialData?: Partial<FormData>;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

export const usePrescricaoForm = ({ initialData }: UsePrescricaoFormProps = {}) => {
  const [formData, setFormData] = useState<FormData>({
    nomePaciente: '',
    idade: 0,
    dih: '',
    dataHoje: '',
    diagnostico: '',
    alergias: '',
    origem: '',
    admissao: '',
    comorbidades: '',
    muc: '',
    exameFisico: '',
    analise: '',
    condutas: '',
    medicamentos: []
  });

  const [historico, setHistorico] = useState<HistoricoInternacao[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'info'
  });

  const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      ...initialData,
      medicamentos: initialData?.medicamentos || []
    }
  });

  useEffect(() => {
    const fetchHistorico = async () => {
      if (formData.nomePaciente) {
        const historicoPaciente = await obterHistorico(formData.nomePaciente);
        setHistorico(historicoPaciente || []);
      }
    };
    fetchHistorico();
  }, [formData.nomePaciente]);

  const handleAddMedicamento = (medicamento: Medicamento) => {
    const currentMedicamentos = formData.medicamentos || [];
    const newMedicamento = {
      ...medicamento,
      id: uuidv4()
    };
    
    const newMedicamentos = [...currentMedicamentos, newMedicamento];
    setFormData(prev => ({
      ...prev,
      medicamentos: newMedicamentos
    }));
    setValue('medicamentos', newMedicamentos);
  };

  const handleRemoveMedicamento = (index: number) => {
    const newMedicamentos = formData.medicamentos.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      medicamentos: newMedicamentos
    }));
    setValue('medicamentos', newMedicamentos);
  };

  const handleMedicamentoChange = (index: number, field: keyof Medicamento, value: string) => {
    const newMedicamentos = formData.medicamentos.map((med, i) => 
      i === index ? { ...med, [field]: value } : med
    );
    setFormData(prev => ({
      ...prev,
      medicamentos: newMedicamentos
    }));
    setValue('medicamentos', newMedicamentos);
  };

  const handleAddAllFixedMedications = () => {
    // Limpar medicamentos existentes
    setFormData(prev => ({
      ...prev,
      medicamentos: []
    }));

    // Ordenar as medicações por ordem e filtrar apenas as da categoria ROTINA
    const medicamentosFixos = medicacoesFixas
      .filter(med => med.categoria === 'ROTINA')
      .sort((a, b) => a.ordem - b.ordem);

    // Adicionar as medicações fixas na ordem correta
    medicamentosFixos.forEach(med => {
      const newMedicamento = {
        id: uuidv4(),
        nome: med.nome,
        dosagem: med.dosagem,
        via: med.via,
        posologia: med.posologia,
        obs: med.obs || '',
        categoria: med.categoria,
        prioridade: med.prioridade,
        variacoes: med.variacoes
      };
      
      setFormData(prev => ({
        ...prev,
        medicamentos: [...prev.medicamentos, newMedicamento]
      }));
    });

    setAlert({
      open: true,
      message: `${medicamentosFixos.length} medicações da rotina foram adicionadas!`,
      severity: 'success'
    });
  };

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      
      // Converter FormData para PrescricaoData
      const prescricaoData: PrescricaoData = {
        nomePaciente: data.nomePaciente,
        idade: String(data.idade),
        dataInternacao: data.dih,
        dataHoje: data.dataHoje,
        diagnostico: data.diagnostico,
        alergias: data.alergias,
        origem: data.origem,
        admissao: data.admissao,
        comorbidades: data.comorbidades,
        muc: data.muc,
        exameFisico: data.exameFisico,
        analise: data.analise,
        condutas: data.condutas,
        medicamentos: data.medicamentos
      };

      await gerarPrescricao(prescricaoData);
      await adicionarInternacao({
        pacienteId: data.nomePaciente,
        data: data.dataHoje,
        descricao: `Prescrição gerada - ${data.diagnostico}`
      });

      setAlert({
        open: true,
        message: 'Prescrição gerada com sucesso!',
        severity: 'success'
      });
    } catch (error) {
      console.error('Erro ao gerar prescrição:', error);
      setAlert({
        open: true,
        message: 'Erro ao gerar prescrição. Tente novamente.',
        severity: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  function formatarData(dataISO: string): string {
    if (!dataISO) return '';
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }

  const dadosParaTemplate = {
    // ... outros campos ...
    dih: formatarData(formData.dih),
    dataHoje: formatarData(formData.dataHoje),
    // ... outros campos ...
  };

  return {
    control,
    errors,
    isLoading,
    alert,
    setAlert,
    handleSubmit: handleSubmit(onSubmit),
    handleAddMedicamento,
    handleRemoveMedicamento,
    handleMedicamentoChange,
    handleAddAllFixedMedications,
    formData,
    setFormData,
    historico
  };
}; 