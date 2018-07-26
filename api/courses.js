import axios from "axios";

export default {
  /**
   * Get list of courses.
   */
  async getCourses(limit) {
    return axios.get(`${process.env.apiUrl}/course?_limit=${limit}`);
  },

  /**
   * Get a single course.
   * @param {string} slug
   */
  async getCourse(slug) {
    return axios.get(`${process.env.apiUrl}/course/${slug}`);
  },

  /**
   * Mark lesson as completed.
   * @param {Object} lesson
   * @param {String} token
   */
  async completeLesson(lesson, token) {
    return axios.post(
      `${process.env.apiUrl}/completedLesson`,
      { lesson: lesson.id, course: lesson.course },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  async getSubmissionComments(submission, token) {
    return axios.get(`${process.env.apiUrl}/comment?submission=${submission}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },

  async addSubmissionComment({ course, comment }, token) {
    return axios.post(
      `${process.env.apiUrl}/comment`,
      { course: course.id, comment },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  /**
   * Create mentorship application
   * @param {Object} lesson
   * @param {String} token
   */
  async createMentorshipApplication(course, token) {
    return axios.post(
      `${process.env.apiUrl}/mentorshipapplication`,
      { course: course.id },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  /**
   * Create a course submission.
   * @param {Object} lesson
   * @param {String} token
   */
  async createSubmission({ lesson, url, description, enrollment }, token) {
    return axios.post(
      `${process.env.apiUrl}/submission`,
      {
        lesson: lesson.id,
        course: lesson.course,
        url,
        description,
        enrollment: enrollment.id
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  /**
   * Get a list of mentorship courses for auth user.
   * @param {String} token
   */
  async getEnrolledAndMentoredCourses(token) {
    return axios.get(
      `${process.env.apiUrl}/course/enrolled-and-mentored-courses`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  },

  /**
   * Add a new comment to the submission.
   * @param {String} token
   */
  async addSubmissionComment({ submission, comment, approved }, token) {
    return axios.post(
      `${process.env.apiUrl}/comment`,
      { submission, comment, approved },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
};
