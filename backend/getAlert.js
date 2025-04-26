// getAlert.js
const axios = require('axios'); 

async function getAlert(payload) {
  try {
    console.log('Payload recebido no getAlert:', JSON.stringify(payload, null, 2));

    if (payload && payload.event) {
      const eventType = payload.event.type; 
      const broadcasterName = payload.event.broadcaster_user_name;
      var alert = ''
      switch (eventType) {
        case 'stream.online':
          alert = `Stream do ${broadcasterName} esta ONLINE!`;
          break;
        case 'stream.offline':
          alert = `Stream do ${broadcasterName} esta OFFLINE.`;
          break;
        default:
          alert = `Evento nao reconhecido: ${eventType}`;
          break;
      }

      return { message: 'Evento processado com sucesso!', eventType: eventType, alert: alert };

    }

    return { message: 'Erro ao processar o evento' };

    
  } catch (err) {
    console.error('Erro ao processar o evento:', err.message);
    throw err; 
  }
}

module.exports = getAlert;