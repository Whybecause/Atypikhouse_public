import axios from "axios";

async function get(url: string): Promise<any> {
  try {
    const res = await axios.get(`/api${url}`);
    return res.data;
  }
  catch (e) {
    throw new Error(e.response.data.message);
  }
}

async function fetcher(url: string): Promise<any> {
  return fetch(url).then(r => r.json());
}

async function post(url: string, data?: any): Promise<any> {
  try {
    const res = await axios.post(`/api${url}`, data);
    return res.data;
  }
  catch (e) {
    throw new Error(e.response.data.message);
  }
}

async function put(url: string, data?: any): Promise<any> {
  try {
    const res = await axios.put(`/api${url}`, data);
    return res.data;
  }
  catch (e) { throw new Error(e.response.data.message); }
}

async function del(url: string): Promise<any> {
  try {
    const res = await axios.delete(`/api${url}`);
    return res.data;
  }
  catch (e) { throw new Error(e.response.data.message); }
}

export default {
  get,
  fetcher,
  post,
  put,
  del
};