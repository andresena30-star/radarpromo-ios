/**
 * Script de empacotamento web para o build do iOS (Capacitor)
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const wwwDir = path.join(rootDir, 'www');

if (!fs.existsSync(wwwDir)) {
  fs.mkdirSync(wwwDir, { recursive: true });
}

// Copia o index.html principal para a pasta www de distribuição mobile
const sourceIndex = path.join(rootDir, 'index.html');
const targetIndex = path.join(wwwDir, 'index.html');

if (fs.existsSync(sourceIndex)) {
  fs.copyFileSync(sourceIndex, targetIndex);
  console.log('✅ index.html sincronizado com sucesso para www/index.html');
} else {
  console.error('❌ index.html não encontrado na raiz');
}
