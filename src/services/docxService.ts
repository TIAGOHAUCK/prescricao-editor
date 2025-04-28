import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { PrescricaoData, Medicamento } from '../types/prescricao';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';

const formatarData = (dataString: string): string => {
  try {
    if (!dataString) return '';
    // Remove qualquer parte da hora que possa existir
    const dataLimpa = dataString.split('T')[0];
    // Divide a data em partes
    const [ano, mes, dia] = dataLimpa.split('-');
    // Retorna no formato DD/MM/YYYY
    return `${dia}/${mes}/${ano}`;
  } catch (error) {
    console.error('Erro ao formatar data:', error);
    return dataString;
  }
};

const loadModelFile = async () => {
  const baseUrl = process.env.PUBLIC_URL || '';
  const paths = [
    `${baseUrl}/modelo-prescricao.docx`,
    `${baseUrl}/prescricao-editor/modelo-prescricao.docx`,
    'modelo-prescricao.docx'
  ];

  for (const path of paths) {
    try {
      console.log('Tentando carregar modelo do caminho:', path);
      const response = await fetch(path);
      if (response.ok) {
        console.log('Modelo carregado com sucesso do caminho:', path);
        return await response.arrayBuffer();
      }
    } catch (error) {
      console.log('Erro ao tentar carregar do caminho:', path, error);
    }
  }
  
  throw new Error('Não foi possível carregar o modelo de prescrição de nenhum caminho');
};

export const generatePrescricao = async (data: PrescricaoData): Promise<Blob> => {
  try {
    // Carregar o modelo fixo
    console.log('Iniciando carregamento do modelo...');
    const arrayBuffer = await loadModelFile();
    console.log('Modelo carregado, tamanho:', arrayBuffer.byteLength, 'bytes');
    
    // Criar o template usando PizZip
    const zip = new PizZip(arrayBuffer);
    const doc = new Docxtemplater();
    doc.loadZip(zip);
    
    // Preparar os dados dos medicamentos
    const medicamentosPreenchidos = [...data.medicamentos];
    
    // Preencher array até 20 posições com valores vazios
    while (medicamentosPreenchidos.length < 20) {
      medicamentosPreenchidos.push({
        id: '',
        nome: '',
        dosagem: '',
        via: '',
        posologia: '',
        obs: ''
      } as Medicamento);
    }

    // Preparar os dados
    const templateData = {
      nomePaciente: data.nomePaciente,
      idade: data.idade,
      dataInternacao: formatarData(data.dataInternacao),
      dataHoje: formatarData(data.dataHoje),
      diagnostico: data.diagnostico,
      alergias: data.alergias || 'Nenhuma',
      origem: data.origem,
      admissao: data.admissao || '',
      comorbidades: data.comorbidades || '',
      muc: data.muc || '',
      exameFisico: data.exameFisico || '',
      analise: data.analise || '',
      condutas: data.condutas || '',
      ...medicamentosPreenchidos.reduce((acc, med, index) => ({
        ...acc,
        [`med${index + 1}_nome`]: med.nome,
        [`med${index + 1}_dosagem`]: med.dosagem,
        [`med${index + 1}_via`]: med.via,
        [`med${index + 1}_posologia`]: med.posologia,
        [`med${index + 1}_obs`]: med.obs
      }), {})
    };

    console.log('Dados preparados para o template');

    // Renderizar o documento
    doc.setData(templateData);
    
    try {
      doc.render();
      console.log('Documento renderizado com sucesso');
    } catch (error: any) {
      console.error('Erro durante a renderização:', error);
      
      if (error.properties && error.properties.errors) {
        console.log('Erros de template:', error.properties.errors);
      }
      
      try {
        const text = zip.files['word/document.xml'].asText();
        console.log('Conteúdo do template:', text);
      } catch (e) {
        console.error('Não foi possível ler o conteúdo do template:', e);
      }
      
      throw error;
    }

    // Gerar o documento final
    const output = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    });

    console.log('Documento gerado com sucesso');
    return output;
  } catch (error) {
    console.error('Erro ao gerar prescrição:', error);
    // Se houver erro, tenta gerar um documento simples
    return await gerarDocumento(data);
  }
};

export const gerarDocumento = async (data: PrescricaoData): Promise<Blob> => {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        new Paragraph({
          children: [
            new TextRun({
              text: 'PRESCRIÇÃO MÉDICA',
              bold: true,
              size: 28,
            }),
          ],
          alignment: 'center',
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Paciente: ${data.nomePaciente}`,
              size: 24,
            }),
          ],
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Data: ${data.dataHoje}`,
              size: 24,
            }),
          ],
        }),
        new Table({
          width: {
            size: 100,
            type: WidthType.PERCENTAGE,
          },
          rows: [
            new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph('Medicamento')],
                  width: {
                    size: 30,
                    type: WidthType.PERCENTAGE,
                  },
                }),
                new TableCell({
                  children: [new Paragraph('Dosagem')],
                  width: {
                    size: 20,
                    type: WidthType.PERCENTAGE,
                  },
                }),
                new TableCell({
                  children: [new Paragraph('Via')],
                  width: {
                    size: 15,
                    type: WidthType.PERCENTAGE,
                  },
                }),
                new TableCell({
                  children: [new Paragraph('Posologia')],
                  width: {
                    size: 20,
                    type: WidthType.PERCENTAGE,
                  },
                }),
                new TableCell({
                  children: [new Paragraph('Observações')],
                  width: {
                    size: 15,
                    type: WidthType.PERCENTAGE,
                  },
                }),
              ],
            }),
            ...data.medicamentos.map(med => new TableRow({
              children: [
                new TableCell({
                  children: [new Paragraph(med.nome.toUpperCase())],
                }),
                new TableCell({
                  children: [new Paragraph(med.dosagem.toUpperCase())],
                }),
                new TableCell({
                  children: [new Paragraph(med.via.toUpperCase())],
                }),
                new TableCell({
                  children: [new Paragraph(med.posologia.toUpperCase())],
                }),
                new TableCell({
                  children: [new Paragraph(med.obs?.toUpperCase() || '')],
                }),
              ],
            })),
          ],
        }),
      ],
    }],
  });

  return await Packer.toBlob(doc);
}; 