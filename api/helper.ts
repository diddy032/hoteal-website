import { sendApiRequest } from "./api";

interface Options {
  method: string;
  url: string;
  useBackendUrl?: boolean;
  payload?: {};
  token?: string;
}

export async function fetchData(url: string, useBackendUrl = true) {
  const options = { method: "get", url, useBackendUrl };

  try {
    const response = await sendApiRequest(options);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function postData(url: string, payload: {}) {
  const options: Options = {
    method: "post",
    url,
    payload,
  };

  try {
    const response = await sendApiRequest(options);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function postDataForToken(
  url: string,
  payload: {},
  token: string
) {
  const options: Options = {
    method: "post",
    url,
    payload,
    token: `bearer ${token}`,
  };

  try {
    const response = await sendApiRequest(options);
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}
