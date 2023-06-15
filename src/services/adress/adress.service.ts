import * as api from "../../utils/helpers/api-helper";
import { IAdress } from "../../slices/adressesSlice";

async function fetchAdresses(): Promise<any> {
  return await api.default.get("/protected/adress/getByUser");
}

async function addAdress(data: IAdress ): Promise<any> {
  return await api.default.post("/protected/adress/create", data);
}

async function updateAdress(id: number, data: IAdress): Promise<any> {
  try {
    await api.default.put(`/protected/adress/update/${id}`, data);
  } catch(e) {
    console.log(e);
  }
}

async function deleteAdress(id: number): Promise<any> {
  try {
    await api.default.del(`/protected/adress/delete/${id}`);
  } catch(e) {
    console.log(e);
  }
}

export default { fetchAdresses, addAdress, updateAdress, deleteAdress };
