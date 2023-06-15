import axios from "axios";
import { showErrorModal } from "../slices/error-successSlice";

const interceptor = (store: any): void => {
  axios.interceptors.request.use(
    (conf) => {
      // you can add some information before send it.
      // conf.headers['Auth'] = 'some token'
      return conf;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  axios.interceptors.response.use(
    (next) => {
      return Promise.resolve(next);
    },
    (error) => {
      store.dispatch(showErrorModal(error.response.data.message || `${error.response.statusText} : ${error.message}`));
      return Promise.reject(error);
    }
  );
};
export default {
  interceptor,
};
