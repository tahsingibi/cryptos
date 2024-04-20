import config from '../config';

const dataUrls = {
  ticker: (symbol) =>
    `wss://stream.binance.com:9443/ws/${symbol?.toLowerCase()}@ticker`,
  kline: (symbol, per) =>
    `wss://stream.binance.com:9443/ws/${symbol?.toLowerCase()}@kline_${per}`,
  book: (symbol) =>
    `wss://stream.binance.com:9443/ws/${symbol?.toLowerCase()}@depth`,
};

export default function createSocket({
  symbol,
  type = 'ticker',
  per = config.chart.per,
  onOpen = () => {},
  onClose = () => {},
  onMessage = () => {},
  onError = () => {},
}) {
  const getUrl = dataUrls[type];
  const wsUrl = getUrl(symbol, per);

  let websocket = new WebSocket(wsUrl);

  websocket.onopen = function (data) {
    onOpen({ data, websocket });
  };

  websocket.onmessage = function (data) {
    const value = JSON.parse(data.data);
    onMessage({ data: value, websocket });
  };

  websocket.onclose = function (data) {
    onClose({ data, websocket });
  };

  websocket.onerror = function (data) {
    onError({ data, websocket });
  };
}
