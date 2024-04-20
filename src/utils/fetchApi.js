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
