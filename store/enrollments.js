import enrollmentsApi from "@/api/enrollments";

import { ADD_ENROLLMENT } from "@/store/courses";

export const state = () => ({
  data: []
});

export const GET_ENROLLMENTS = "GET_ENROLLMENTS";
export const CREATE_ENROLLMENT = "CREATE_ENROLLMENT";

export const actions = {
  async [CREATE_ENROLLMENT]({ commit, rootState }, course) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: enrollment } = await enrollmentsApi.enrollIntoCourse(
          course,
          rootState.authUserData.jwt
        );
        commit(`courses/${ADD_ENROLLMENT}`, { enrollment }, { root: true });

        return resolve(enrollment);
      } catch (error) {
        return reject(error);
      }
    });
    s;
  }
};

export const mutations = {};
