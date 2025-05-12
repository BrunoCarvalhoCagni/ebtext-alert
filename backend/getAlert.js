// getAlert.js
const axios = require('axios'); 

async function getAlert(payload) {
  try {
    console.log('Payload recebido no getAlert:', JSON.stringify(payload, null, 2));

    if (payload && payload.event) {
      // Primeiro tenta pegar do event.type, se não existir, pega da subscription.type
      const eventType = payload.event.type || payload.subscription.type;
      const broadcasterName = payload.event.broadcaster_user_name;
      
      let alert = '';
      let flavor = '';

      switch (eventType) {
        case 'stream.online':
          alert = `Stream do ${broadcasterName} está ONLINE!`;
          flavor = 'mint';
          break;
          
        case 'channel.follow':
          const followerName = payload.event.user_name;
          alert = `${followerName} acabou de seguir [LINE] ${broadcasterName}!`;
          flavor = 'peanut';
          break;
      }

      return { message: 'Evento processado com sucesso!', eventType, alert, flavor };
    }

    return { message: 'Erro ao processar o evento' };

  } catch (err) {
    console.error('Erro ao processar o evento:', err.message);
    throw err; 
  }
}

module.exports = getAlert;