import axios from "axios";

export default {
  /**
   * Get the markdown content for a lesson.
   * @param {Object} lesson
   */
  getLessonCotent(lesson) {
    return axios.get(lesson.url);
  }
};
