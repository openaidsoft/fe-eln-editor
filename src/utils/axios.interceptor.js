import axios from "axios";
// import { store } from "@/store";

const DELAY_DURATION = 1;

export const axiosInterceptor = {
  regist() {
    axios.interceptors.request.use(
      function (config) {
        // store.commit('startSpinner');
        // store.commit('startBlockUi');
        // store.state.LoadingStatus = true;
        // store.state.BlockStatus = true;
        return config;
      },
      function (error) {
        console.log(error);
        setTimeout(() => {
          // store.commit('endSpinner');
          // store.commit('endBlockUi');
        }, DELAY_DURATION);
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      function (response) {
        console.log("res", response);
        setTimeout(() => {
          // store.commit('endSpinner');
          // store.commit('endBlockUi');
        }, DELAY_DURATION);
        return response;
      },
      function (error) {
        setTimeout(() => {
          // store.commit('endSpinner');
          // store.commit('endBlockUi');
        }, DELAY_DURATION);
        return Promise.reject(error);
      }
    );
  },
};
