let websocket;
let lastType;

const socketUrl = {
  ticker: (symbol) => `wss://stream.binance.com:9443/ws/${symbol}@ticker`,
  kline: (symbol) => `wss://stream.binance.com:9443/ws/${symbol}@kline_1m`,
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

  if (websocket && type === lastType) websocket.close();

  websocket = new WebSocket(wsUrl);
  lastType = type;

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
