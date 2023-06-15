import { IUpdateUser } from "../../slices/userSlice";
import * as api from "../../utils/helpers/api-helper";

async function fetchCurrentUser(): Promise<any> {
  return await api.default.get("/protected/user/getBySession");
}
async function updateCurrentUser(data: IUpdateUser): Promise<any> {
  return await api.default.put("/protected/user/update", data);
}
export default { fetchCurrentUser, updateCurrentUser };
