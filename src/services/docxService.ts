import { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType } from 'docx';
import { PrescricaoData } from '../types/prescricao';

export const generatePrescricao = async (data: PrescricaoData): Promise<Blob> => {
  try {
    console.log('Gerando documento com template dinâmico...');
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
                text: `Nome: ${data.nomePaciente}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Idade: ${data.idade}`,
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
          new Paragraph({
            children: [
              new TextRun({
                text: `Diagnóstico: ${data.diagnostico}`,
                size: 24,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Alergias: ${data.alergias || 'Nenhuma'}`,
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
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: 'Medicamento', bold: true })]
                    })],
                    width: {
                      size: 30,
                      type: WidthType.PERCENTAGE,
                    },
                  }),
                  new TableCell({
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: 'Dosagem', bold: true })]
                    })],
                    width: {
                      size: 20,
                      type: WidthType.PERCENTAGE,
                    },
                  }),
                  new TableCell({
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: 'Via', bold: true })]
                    })],
                    width: {
                      size: 15,
                      type: WidthType.PERCENTAGE,
                    },
                  }),
                  new TableCell({
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: 'Posologia', bold: true })]
                    })],
                    width: {
                      size: 20,
                      type: WidthType.PERCENTAGE,
                    },
                  }),
                  new TableCell({
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: 'Observações', bold: true })]
                    })],
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
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: med.nome.toUpperCase() })]
                    })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: med.dosagem.toUpperCase() })]
                    })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: med.via.toUpperCase() })]
                    })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: med.posologia.toUpperCase() })]
                    })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ 
                      children: [new TextRun({ text: (med.obs || '').toUpperCase() })]
                    })],
                  }),
                ],
              })),
            ],
          }),
          // Adicionar campos adicionais
          ...(data.admissao ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: `\nAdmissão: ${data.admissao}`,
                  size: 24,
                }),
              ],
            }),
          ] : []),
          ...(data.comorbidades ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: `\nComorbidades: ${data.comorbidades}`,
                  size: 24,
                }),
              ],
            }),
          ] : []),
          ...(data.exameFisico ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: `\nExame Físico: ${data.exameFisico}`,
                  size: 24,
                }),
              ],
            }),
          ] : []),
          ...(data.condutas ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: `\nCondutas: ${data.condutas}`,
                  size: 24,
                }),
              ],
            }),
          ] : []),
        ],
      }],
    });

    console.log('Documento criado, gerando blob...');
    const blob = await Packer.toBlob(doc);
    console.log('Blob gerado, criando URL...');
    const url = window.URL.createObjectURL(blob);
    console.log('URL criada:', url);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `prescricao_${data.nomePaciente}_${data.dataHoje}.docx`;
    document.body.appendChild(link);
    console.log('Link criado, iniciando download...');
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    console.log('Download iniciado');
    
    return blob;
  } catch (error) {
    console.error('Erro ao gerar prescrição:', error);
    throw error instanceof Error ? error : new Error('Erro ao gerar prescrição');
  }
}; 