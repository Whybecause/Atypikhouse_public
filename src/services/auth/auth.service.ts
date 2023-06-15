// Import External Dependencies
import { signIn, signOut } from "next-auth/client";
import emailService from "../../services/email/email.service";
import { showErrorModal, showSuccessModal } from "../../slices/error-successSlice";
import { store } from "../../store";

// Import Internal Dependencies
import * as api from "../../utils/helpers/api-helper";
export interface RegisterPayload {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
}

export type prefix = "/auth/v1";

async function register(data: RegisterPayload): Promise<any> {
  const prefix: prefix = "/auth/v1";
  try {
    await api.default.post(`${prefix}/signup`, data);
    store.dispatch(showSuccessModal(`Bienvenue chez Atypikhouse ${data.firstname}`));
    await emailService.onSuccessRegister({ emailTo: data.email, firstname: data.firstname });
    return signIn("credentials", { email: data.email, password: data.password, callbackUrl: "/" });
  } catch (e) {
    console.log(e);
  }
}

export interface SignInPayload {
  email: string;
  password: string;
}

async function credentialsSignIn(data: SignInPayload): Promise<any> {
  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email, password: data.password,
      callbackUrl: "/"
    });

    if (res.error) {
      store.dispatch(showErrorModal("Identifiants incorrets"));
    }
  } catch (e) {
    console.log(e);
  }
}

async function googleSignIn(): Promise<any> {
  return signIn("google", {
    callbackUrl: "https://atypikhouse-f2i-devo19-mg-nh-mt.vercel.app/api/auth/callback/google"
  });
}

async function deleteUserAccount() {
  try {
    await api.default.del("/protected/user/delete");
    signOut({ callbackUrl: `${process.env.CLIENT_URL}/` });
  } catch (e) {
    console.error(e);
    return e;
  }
}

export interface IUpdatePassword {
  password: string,
  newPassword: string
  newPasswordConfirm: string
}
async function updatePassword(data: IUpdatePassword): Promise<any> {
  try {
    await api.default.put("/protected/user/update/password", data);
    store.dispatch(showSuccessModal("Votre mot de passe a été mis à jour."));
  } catch (e) {
    console.log(e);
  }
}

export interface IResetPassword {
  identifier: string,
  token: string,
  password: string,
  passwordConfirm: string
}

async function resetPassword(data: IResetPassword): Promise<any> {
  try {
    if (data.password !== data.passwordConfirm) {
      return store.dispatch(showErrorModal("Les mots de passe ne sont pas identiques"));
    }
    await api.default.put("/auth/resetPassword", data);
    store.dispatch(showSuccessModal("Votre mot de passé a été changé."));
  } catch (e) {
    console.log(e);
  }
}
export default {
  register,
  credentialsSignIn,
  googleSignIn,
  deleteUserAccount,
  updatePassword,
  resetPassword
};
