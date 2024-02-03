import axios from "axios";
interface Options {
  method: string;
  url: string;
  payload?: any;
  token?: string;
  useBackendUrl?: boolean;
}

interface Settings {
  method: string;
  url: string;
  data?: any;
  headers?: any;
}

export async function sendApiRequest(options: Options) {
  const { method, url, payload, token, useBackendUrl = true } = options;

  const settings: Settings = {
    method: method,
    url: ((useBackendUrl && process.env.NEXT_PUBLIC_URL) || "") + url,
  };

  if (payload) settings.data = payload;
  if (token) settings.headers = { Authorization: token };

  try {
    const res = await axios(settings);
    return res;
  } catch (err: any) {
    if (err?.response?.data) {
      console.error("error when calling api:", err?.response?.data);
    } else {
      console.error("error when calling api:", err);
    }
    throw err;
  }
}
