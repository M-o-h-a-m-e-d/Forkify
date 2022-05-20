import { OFFLINE_ERROR_MESSAGE } from './config';
export const checkOnlineStatus = () => {
  try {
    const status = window.navigator.onLine;
    if (!status) throw new Error(OFFLINE_ERROR_MESSAGE);
  } catch (error) {
    throw error;
  }
};
export const GEN_ING_ERR_MSG = ingNum => `
  Ingredient ${ingNum} Error.<br>
  PLEASE FOLLOW THE RIGHT FORMAT:)<br>
  'Quantity,Unit,Description'`;

export async function FETCH_URL(
  url,
  errMessage = 'Sorry, something went wrong!'
) {
  try {
    const fetchMethodIsGet = typeof url === 'string';
    const res = fetchMethodIsGet
      ? await fetch(url)
      : await fetch(url.url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: url.body,
          mode: 'cors',
        });
    console.log(res);
    if (!res.ok) throw new Error(url.errMessage || errMessage);

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
