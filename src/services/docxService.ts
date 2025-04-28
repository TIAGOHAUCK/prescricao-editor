import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { PrescricaoData, Medicamento } from '../types/prescricao';
import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';

export const generatePrescricao = async (data: PrescricaoData): Promise<Blob> => {
  try {
    // Carregar o modelo fixo
    const baseUrl = process.env.PUBLIC_URL || '';
    const modelPath = `${baseUrl}/modelo-prescricao.docx`;
    console.log('Tentando carregar o modelo do caminho:', modelPath);
    
    try {
      const response = await fetch(modelPath);
      console.log('Status da resposta:', response.status);
      console.log('Headers da resposta:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        console.error('Erro ao carregar modelo:', response.status, response.statusText);
        // Se falhar com o caminho do GitHub Pages, tenta com caminho relativo
        const fallbackResponse = await fetch('/modelo-prescricao.docx');
        if (!fallbackResponse.ok) {
          throw new Error(`Não foi possível carregar o modelo de prescrição: ${response.statusText}`);
        }
        console.log('Modelo carregado com caminho fallback');
        return await gerarDocumento(data); // Usa o template alternativo se o modelo não puder ser carregado
      }

      const arrayBuffer = await response.arrayBuffer();
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
        dataInternacao: data.dataInternacao,
        dataHoje: data.dataHoje,
        diagnostico: data.diagnostico,
        alergias: data.alergias || 'Nenhuma',
        origem: data.origem,
        // Novos campos
        admissao: data.admissao || '',
        comorbidades: data.comorbidades || '',
        muc: data.muc || '',
        exameFisico: data.exameFisico || '',
        analise: data.analise || '',
        condutas: data.condutas || '',
        // Campos dos medicamentos
        ...medicamentosPreenchidos.reduce((acc, med, index) => ({
          ...acc,
          [`med${index + 1}_nome`]: med.nome,
          [`med${index + 1}_dosagem`]: med.dosagem,
          [`med${index + 1}_via`]: med.via,
          [`med${index + 1}_posologia`]: med.posologia,
          [`med${index + 1}_obs`]: med.obs
        }), {})
      };

      console.log('Dados a serem inseridos:', templateData);

      // Renderizar o documento
      doc.setData(templateData);
      
      try {
        doc.render();
      } catch (error: any) {
        console.error('Erro durante a renderização:', error);
        
        // Log mais detalhado do erro
        if (error.properties && error.properties.errors) {
          console.log('Erros de template:', error.properties.errors);
        }
        
        // Log do conteúdo do template para debug
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
    } catch (fetchError) {
      console.error('Erro ao carregar ou processar o modelo:', fetchError);
      // Se houver qualquer erro no processo, usa o template alternativo
      return await gerarDocumento(data);
    }
  } catch (error) {
    console.error('Erro ao gerar prescrição:', error);
    throw error instanceof Error ? error : new Error('Erro ao gerar prescrição');
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