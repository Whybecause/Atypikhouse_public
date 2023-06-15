import * as api from "../../utils/helpers/api-helper";
import { ICommentRate } from "../../slices/propertiesSlice";

async function addCommentary(id: number, data: ICommentRate): Promise<any> {
  return await api.default.post(`/protected/commentary/create/${id}`, data);
}

export default { addCommentary };
