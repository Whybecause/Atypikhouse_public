import * as api from "../../utils/helpers/api-helper";
import { IHistorical } from "../../slices/propertiesSlice";

async function addUnavailableDates(id: number, data: IHistorical): Promise<any> {
  return await api.default.post(`/protected/historical/create/${id}`, data);
}

async function deleteReservation(id: number): Promise<any> {
  try {
    await api.default.del(`/protected/historical/delete/${id}`);
  } catch (e) {
    console.log(e);
  }
}

export default { addUnavailableDates, deleteReservation };
