import axios from "axios";

export default {
  /**
   * Github authentication.
   * @param {string} code
   * @param {string} provider
   */
  async providerCallback(code, provider = "github") {
    return axios.get(
      `${process.env.apiUrl}/auth/${provider}/callback?code=${code}`
    );
  },

  /**
   * Local registration.
   * @param {Object} data
   */
  async localRegister(data) {
    return axios.post(`${process.env.apiUrl}/auth/local/register`, data);
  },

  /**
   * Local login.
   * @param {Object} data
   */
  async localLogin(data) {
    return axios.post(`${process.env.apiUrl}/auth/local`, data);
  }
};
