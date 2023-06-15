import * as api from "../../utils/helpers/api-helper";
import { IUpdateProperty } from "../../slices/propertiesSlice";
import { IEquip } from "../../slices/equipementsSlice";
import { IPropertyType } from "../../slices/propertyTypesSlice";
import { IUpdateUser } from "../../slices/userSlice";
import { store } from "../../store";
import { showSuccessModal } from "../../slices/error-successSlice";

async function fetchUsers() {
  return await api.default.get("/protected/admin/user/getAll");
}

// ---- EQUIPS --------
async function fetchEquips(): Promise<any> {
  return await api.default.get("/equipements");
}

async function createEquipType(data: IEquip): Promise<any> {
  return await api.default.post("/protected/admin/equipements/create", data);
}

async function updateEquip(id: number, data: IEquip): Promise<any> {
  try {
    await api.default.put(`/protected/admin/equipements/update/${id}`, data);
  } catch (e) {
    console.log(e);
  }
}

async function deleteEquipType(id: number): Promise<any> {
  try {
    await api.default.del(`/protected/admin/equipements/delete/${id}`);
  } catch (e) {
    console.log(e);
  }
}

// ---------USERS ---------//

async function updateUser(id, data: IUpdateUser): Promise<any> {
  try {
    await api.default.put(`/protected/admin/user/update/${id}`, data);
  } catch (e) {
    console.log(e);
  }
}
async function deleteUser(id: number): Promise<any> {
  try {
    await api.default.del(`/protected/admin/user/delete/${id}`);
  } catch (e) {
    console.log(e);
  }
}

// ------------- PROPERTY

async function updateProperty(id: number, data: IUpdateProperty): Promise<any> {
  try {
    const res = await api.default.put(`/protected/admin/property/update/${id}`, data);
    store.dispatch(showSuccessModal("L'annonce a été modifiée."));
    return res;
  } catch (e) {
    console.log(e);
  }
}

async function deleteProperty(id: number): Promise<any> {
  try {
    return await api.default.del(`/protected/admin/property/delete/${id}`);
  } catch (e) {
    console.log(e.response);
  }
}

// -----------COMMENTS
async function updateComment(id: number, data: any): Promise<any> {
  try {
    await api.default.put(`/protected/admin/commentary/update/${id}`, data);
  } catch (e) {
    console.log(e);
  }
}

async function deleteComment(id: number): Promise<any> {
  try {
    await api.default.del(`/protected/admin/commentary/delete/${id}`);
  } catch (e) {
    console.log(e);
  }
}


// -----------PROPERTY TYPES
async function fetchPropertyTypes(): Promise<any> {
  return await api.default.get("/propertyType");
}

async function createPropertyType(data: IPropertyType): Promise<any> {
  return await api.default.post("/protected/admin/propertyType/create", data);
}

async function updatePropertyType(id: number, data: IPropertyType): Promise<any> {
  try {
    await api.default.put(`/protected/admin/propertyType/update/${id}`, data);
  } catch (e) {
    console.log(e);
  }
}
async function deletePropertyType(id: number): Promise<any> {
  try {
    await api.default.del(`/protected/admin/propertyType/delete/${id}`);
  } catch (e) {
    console.log(e);
  }
}

export default {
  fetchEquips,
  createEquipType,
  updateEquip,
  deleteEquipType,

  fetchUsers,
  updateUser,
  deleteUser,

  updateProperty,
  updateComment,
  deleteComment,
  deleteProperty,

  fetchPropertyTypes,
  createPropertyType,
  updatePropertyType,
  deletePropertyType
};
