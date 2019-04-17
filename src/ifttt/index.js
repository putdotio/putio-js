export default class IFTTT {
  constructor(client) {
    this.client = client;
  }

  SendEvent({ eventType, ingredients = {}, clientName = undefined }) {
    return this.client.post('/ifttt-client/event', {
      body: {
        event_type: eventType,
        ingredients,
        client_name: clientName,
      },
    });
  }
}
