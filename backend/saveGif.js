const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function makeName(extension = '.txt') {
  const randomName = crypto.randomBytes(16).toString('hex');
  return randomName + extension;
}

async function saveGif(buffer) {
  const fileName = makeName('.gif');
  const OBSFolder = process.env.OBS_ALERTS_PATH;
  const newPath = path.join(OBSFolder, fileName);

  fs.writeFileSync(newPath, buffer);
}

module.exports = saveGif;