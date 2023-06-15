import * as api from "../../utils/helpers/api-helper";

async function fetchMessages(): Promise<any> {
  return await api.default.get("/protected/message/store&room");
}
async function addMessage(id: number, data: any): Promise<any> {
  return await api.default.post(`/protected/message/create/${id}`, data);
}
async function markAsRead(roomId: number, data: any): Promise<any> {
  try {
    await api.default.put(`/protected/message/markAsRead/${roomId}`, data);
  }
  catch (e) {
    console.log(e);
  }
}
async function deleteMessages(id: number): Promise<any> {
  try {
    const res = await api.default.del(`/protected/message/delete/${id}`);
    console.log(res);
    return res;
  }
  catch (e) {
    console.log(e);
  }
}

export default { fetchMessages, addMessage, markAsRead, deleteMessages };
