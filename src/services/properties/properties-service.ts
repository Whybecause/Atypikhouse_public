import * as api from "../../utils/helpers/api-helper";
import { IProperty, IUpdateProperty } from "../../slices/propertiesSlice";
import { store } from "../../store";
import { showSuccessModal } from "../../slices/error-successSlice";

async function fetchProperties(): Promise<any> {
  return await api.default.get("/protected/property/getAll");
}
async function addProperty(data: IProperty): Promise<any> {
  return await api.default.post("/protected/property/create", data);
}
async function updateProperty(id: number, data: IUpdateProperty): Promise<any> {
  try {
    const res =  await api.default.put(`/protected/property/update/${id}`, data);
    store.dispatch(showSuccessModal("L'annonce a été modifiée."));
    return res;
  } catch(e) {
    console.log(e);
  }
}
async function deleteProperty(id: number): Promise<any> {
  try {
    const res = await api.default.del(`/protected/property/delete/${id}`);
    return res;
  } catch(e) {
    console.log(e);
  }
}

export default { fetchProperties, addProperty, updateProperty, deleteProperty };
