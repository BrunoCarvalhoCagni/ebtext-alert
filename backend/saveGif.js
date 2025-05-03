const fs = require('fs');
const path = require('path');

async function saveGif(buffer, nomeArquivo = 'alert.gif') {
  const pastaOBS = process.env.OBS_ALERTS_PATH;
  const caminho = path.join(pastaOBS, nomeArquivo);

  fs.writeFileSync(caminho, buffer);
}

module.exports = saveGif;