import { initialSymbols } from '../utils/symbols';

const defaultSymbol = initialSymbols[0];

const config = {
  defaultSymbol: defaultSymbol,
  chart: {
    per: '1m',
    data: null,
    pers: ['1m', '5m', '15m', '1h', '12h'],
  },
};

export default config;
