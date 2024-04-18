let websocket = null;

const socketUrl = {
  ticker: (symbol) => `wss://stream.binance.com:9443/ws/${symbol}@ticker`,
};

export default function createSocket({
  symbol,
  type = 'ticker',
  onOpen = () => {},
  onClose = () => {},
  onMessage = () => {},
  onError = () => {},
}) {
  const getUrl = socketUrl[type];
  const wsUrl = getUrl(symbol);

  if (websocket) websocket.close();

  websocket = new WebSocket(wsUrl);

  websocket.onopen = function (e) {
    onOpen(e);
  };

  websocket.onmessage = function (e) {
    const value = JSON.parse(e.data);
    onMessage(value);
  };

  websocket.onclose = function (e) {
    onClose(e);
  };

  websocket.onerror = function (e) {
    onError(e);
  };
}
