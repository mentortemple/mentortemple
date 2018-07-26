import axios from "axios";

export default {
  /**
   * Enroll a user into a course
   * @param {String} course id of the course
   */
  enrollIntoCourse(course, token) {
    return axios.post(
      `${process.env.apiUrl}/enrollment`,
      {
        course: course.id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
};
