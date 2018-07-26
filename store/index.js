import Cookie from "js-cookie";
import CookieParser from "cookieparser";

import auth from "@/api/auth";

export const SET_AUTH_USER = "SET_AUTH_USER";
export const UNSET_AUTH_USER = "UNSET_AUTH_USER";
export const SET_AUTH_USER_LOCAL_LOGIN = "SET_AUTH_USER_LOCAL_LOGIN";
export const SET_AUTH_USER_LOCAL_SIGNUP = "SET_AUTH_USER_LOCAL_SIGNUP";

export const state = () => ({
  authUserData: null,
  isAuthenticated: false
});

export const mutations = {
  [SET_AUTH_USER](state, authUserData) {
    state.authUserData = authUserData;
    if (authUserData) {
      state.isAuthenticated = true;
    }
  },
  [UNSET_AUTH_USER](state) {
    state.authUserData = null;
    state.isAuthenticated = false;
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    let authUserData = null;
    const cookies = req.headers.cookie
      ? CookieParser.parse(req.headers.cookie)
      : {};

    if (cookies.authUserData) {
      authUserData = JSON.parse(cookies.authUserData);
    }

    commit(SET_AUTH_USER, authUserData);
  },

  async [SET_AUTH_USER]({ commit }, code) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await auth.providerCallback(code);

        Cookie.set("authUserData", data);
        commit(SET_AUTH_USER, data);

        return resolve(data);
      } catch (error) {
        return reject(error.response.data);
      }
    });
  },

  async [SET_AUTH_USER_LOCAL_SIGNUP]({ commit }, userCredentials) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await auth.localRegister(userCredentials);

        Cookie.set("authUserData", data);
        commit(SET_AUTH_USER, data);

        return resolve();
      } catch (error) {
        return reject(error.response.data);
      }
    });
  },

  async [SET_AUTH_USER_LOCAL_LOGIN]({ commit }, userCredentials) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await auth.localLogin(userCredentials);

        Cookie.set("authUserData", data);
        commit(SET_AUTH_USER, data);

        return resolve();
      } catch (error) {
        return reject(error.response.data);
      }
    });
  },

  [UNSET_AUTH_USER]({ commit }) {
    Cookie.remove("authUserData");
    commit(UNSET_AUTH_USER);
  }
};
