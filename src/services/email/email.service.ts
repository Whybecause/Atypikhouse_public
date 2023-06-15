import { showSuccessModal } from "../../slices/error-successSlice";
import { store } from "../../store";
import * as api from "../../utils/helpers/api-helper";

interface IEmail {
  emailTo: string,
  emailFrom: string,
  subject: string,
  message: string,
  city: string,
  dateStart: string,
  dateEnd: string
}

async function onHostDeleteTenantResa(data: IEmail): Promise<any> {
  try {
    return await api.default.post("/email/onHostDeleteTenantResa", data);
  } catch (err) {
    console.log(err);
  }
}

interface IRegister {
  emailTo: string,
  firstname: string
}
async function onSuccessRegister(data: IRegister) {
  try {
    return await api.default.post("/email/onSuccessRegister", data);
  } catch (e) {
    console.log(e);
  }
}

export interface IResetPassword {
  email: string,
}
async function sendResetPasswordLink(data: IResetPassword) {
  try {
    await api.default.post("/email/sendResetPasswordLink", data);
    store.dispatch(showSuccessModal("Un lien a été envoyé sur votre adresse email (vérifiez les spams)"));
  } catch (e) {
    console.log(e);
  }
}

export default {
  onSuccessRegister,
  sendResetPasswordLink,
  onHostDeleteTenantResa
};
