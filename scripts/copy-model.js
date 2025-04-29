const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, '..', 'public', 'modelo-prescricao.docx');
const targetDir = path.join(__dirname, '..', 'build');
const targetFile = path.join(targetDir, 'modelo-prescricao.docx');

// Garantir que o arquivo modelo existe
if (!fs.existsSync(sourceFile)) {
  console.error('Arquivo modelo não encontrado em:', sourceFile);
  process.exit(1);
}

// Copiar o arquivo
try {
  fs.copyFileSync(sourceFile, targetFile);
  console.log('Arquivo modelo copiado com sucesso para:', targetFile);
} catch (error) {
  console.error('Erro ao copiar arquivo modelo:', error);
  process.exit(1);
} 