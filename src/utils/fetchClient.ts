import { RequestMethod } from '../types/RequestMethod';

const BASE_URL = 'https://scriptsquad-products-api.onrender.com';

function request<T>(
  url: string,
  method: RequestMethod = 'GET',
  data: any = null,
): Promise<T> {
  const options: RequestInit = { method };
  const fullUrl = BASE_URL + url;

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      'Content-type': 'application/json; charset=UTF-8',
    };
  }

  return fetch(fullUrl, options).then((response) => {
    if (!response.ok) {
      throw Error();
    }

    return response.json();
  });
}

export const client = {
  getImg: (url: string) => `${BASE_URL}/${url}`,
  get: <T>(url: string) => request<T>(url),
  post: <T>(url: string, data: any) => request<T>(url, 'POST', data),
};
