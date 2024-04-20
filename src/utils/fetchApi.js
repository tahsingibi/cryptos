export default async function fetchApi({
  url,
  onSuccess = (e) => e,
  onError = (e) => e,
  onLoading = (e) => e,
}) {
  onLoading(true);

  let result, error;

  try {
    const request = await fetch(url);
    const json = await request.json();
    onSuccess(json);
    result = json;
  } catch (err) {
    onError(err);
    error = err;
  } finally {
    onLoading(false);
  }

  return { result, error };
}

export async function getDepth({ symbol }) {
  const url = `https://api.binance.com/api/v3/depth?symbol=${symbol}&limit=25`;

  const { result, error } = await fetchApi({ url });

  return { result, error };
}

export async function getKline({ symbol, per }) {
  const url = `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${per}&limit=500`;

  const { result, error } = await fetchApi({ url });

  return { result, error };
}
