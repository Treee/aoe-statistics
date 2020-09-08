const SocketEnums = require("./socket-enums");
const WebSocket = require("ws");

module.exports = {
  clientProperties: {
    clientId: ''
  },
  // dataType: SocketEnums, rawData: any
  formatDataForWebsocket(dataType, rawData) {
    console.log(`Formatting Data for websocket.\nDataType: ${dataType} / ClientId: ${this.clientProperties.clientId} / RawData:`, rawData);
    return JSON.stringify({
      type: dataType,
      data: rawData,
      toClientId: this.clientProperties.clientId
    });
  },
  sendMessage(dataType, rawData) {
    this.socket.send(this.formatDataForWebsocket(dataType, rawData));
  },
  startClient(clientId, callbackFn) {
    this.clientProperties.clientId = clientId;
    this.clientProperties.callbackFn = callbackFn;
    const isLocal = !process.env.SERVER_PORT;
    this.serverUrl = isLocal ? 'ws://localhost:8446' : 'wss://itsatreee.com/treeemotes/';
    this.socket = new WebSocket(this.serverUrl);
    this.socket.onopen = this.onOpen.bind(this);
    // this.socket.onmessage = this.onMessage.bind(this);
    this.socket.onmessage = callbackFn;
    this.socket.onclose = this.onClose;
    this.socket.onerror = this.onError;
    return this;
  },
  onOpen() {
    console.log('[open] Connection established');
    this.sendMessage(SocketEnums.ClientRegister, this.clientProperties.clientId);
    this.pingInterval = setInterval(() => {
      this.sendMessage(SocketEnums.PING, {});
    }, 45 * 1000); // ping the server on startup every 45 seconds to keep the connection alive
  },
  onMessage(event) {
    console.log(`DataType: ${event.type} / RawData: ${JSON.stringify(event.data)}`);
  },
  onClose(event) {
    if (event.wasClean) {
      console.log(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
    } else {
      // e.g. server process killed or network down
      // event.code is usually 1006 in this case
      console.log('[close] Connection died');
    }
    clearInterval(this.pingInterval);
  },
  onError(event) {
    console.log(`[error] ${event.message}`);
  },
  randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}