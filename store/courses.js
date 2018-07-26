import courses from "@/api/courses";

export const state = () => ({
  data: [],
  mentorshipCourses: [],
  enrolledCourses: []
});

// mutations
export const ADD_COURSE = "ADD_COURSE";
export const ADD_COURSES = "ADD_COURSES";
export const ADD_ENROLLMENT = "ADD_ENROLLMENT";
export const COMPLETE_LESSON = "COMPLETE_LESSON";
export const CREATE_SUBMISSION = "CREATE_SUBMISSION";
export const ADD_ENROLLED_COURSES = "ADD_ENROLLED_COURSES";
export const ADD_MENTORED_COURSES = "ADD_MENTORED_COURSES";
export const TOGGLE_COMPLETED_LESSON = "ADD_COMPLETED_LESSON";
export const ADD_MENTOR_APPLICATION = "ADD_MENTOR_APPLICATION";
export const ADD_SUBMISSION_COMMENT = "ADD_SUBMISSION_COMMENT";
export const ADD_COURSES_TOTAL_COUNT = "ADD_COURSES_TOTAL_COUNT";

// actions
export const GET_COURSE = "GET_COURSE";
export const GET_COURSES = "GET_COURSES";
export const GET_SUBMISSION_COMMENTS = "GET_SUBMISSION_COMMENTS";
export const GET_ENROLLED_AND_MENTORED_COURSES = "GET_MENTORED_COURSES";

// Getters
export const GET_LESSON = "GET_LESSON";

export const mutations = {
  [ADD_COURSE](state, course) {
    state.data = [
      ...state.data,
      {
        ...course,
        lessons: course.lessons.sort((a, b) => a.position > b.position)
      }
    ];
  },
  [ADD_COURSES](state, courses) {
    const newCourses = [];
    courses.forEach(course => {
      if (!state.data.find(courseInStore => courseInStore.id === course.id)) {
        newCourses.push({
          ...course,
          lessons: course.lessons.sort((a, b) => a.position > b.position)
        });
      }
    });

    state.data = [...state.data, ...newCourses];
  },
  [ADD_COURSES_TOTAL_COUNT](state, count) {
    state.count = count;
  },
  [ADD_ENROLLMENT](state, { enrollment }) {
    const course = state.data.findIndex(
      courseInStore => courseInStore.id === enrollment.course.id
    );

    state.data = state.data.map(course => {
      if (course.id === enrollment.course.id) {
        return {
          ...course,
          enrollments: [...course.enrollments, enrollment]
        };
      }

      return course;
    });
  },
  [TOGGLE_COMPLETED_LESSON](state, completedLesson) {
    state.data = state.data.map(course => {
      if (course.id === completedLesson.course.id) {
        const completedLessonInStore = course.completedlesson.find(
          completedLessonInStore =>
            completedLessonInStore.id === completedLesson.id
        );

        if (completedLessonInStore) {
          return {
            ...course,
            completedlesson: course.completedlesson.filter(
              completedLessonInCourse =>
                completedLessonInCourse.id !== completedLessonInStore.id
            )
          };
        } else {
          return {
            ...course,
            completedlesson: [...course.completedlesson, completedLesson]
          };
        }
      }
      return course;
    });
  },
  [CREATE_SUBMISSION](state, submission) {
    state.data = state.data.map(course => {
      if (course.id === submission.course.id) {
        return {
          ...course,
          submissions: [...course.submissions, submission]
        };
      }

      return course;
    });
  },
  [ADD_MENTOR_APPLICATION](state, application) {
    state.data = state.data.map(course => {
      if (course.id === application.course.id) {
        return {
          ...course,
          mentorshipApplications: [
            ...course.mentorshipApplications,
            application
          ]
        };
      }

      return course;
    });
  },
  [ADD_MENTORED_COURSES](state, enrollments) {
    const newEnrollments = [];
    enrollments.forEach(enrollment => {
      if (
        !state.mentorshipCourses.find(
          enrollmentInStore => enrollmentInStore.id === enrollment.id
        )
      ) {
        newEnrollments.push(enrollment);
      }
    });

    state.mentorshipCourses = [...state.mentorshipCourses, ...newEnrollments];
  },
  [ADD_ENROLLED_COURSES](state, enrollments) {
    const newEnrollments = [];
    enrollments.forEach(enrollment => {
      if (
        !state.enrolledCourses.find(
          enrollmentInStore => enrollmentInStore.id === enrollment.id
        )
      ) {
        newEnrollments.push(enrollment);
      }
    });

    state.enrolledCourses = [...state.enrolledCourses, ...newEnrollments];
  },
  [ADD_SUBMISSION_COMMENT](state, { comment, enrollment: currentEnrollment }) {
    state.mentorshipCourses = state.mentorshipCourses.map(enrollment => {
      if (enrollment.id === currentEnrollment.id) {
        return {
          ...enrollment,
          submissions: enrollment.submissions.map(submission => {
            if (submission.id === comment.submission.id) {
              return comment.submission;
            }

            return submission;
          })
        };
      }

      return enrollment;
    });
  }
};

export const actions = {
  async [GET_COURSES]({ commit, state }, limit = 5) {
    return new Promise(async (resolve, reject) => {
      try {
        if (state.data.length > 1 && limit === 5) {
          return resolve();
        }

        const { data } = await courses.getCourses(limit);

        commit(ADD_COURSES, data.courses);
        commit(ADD_COURSES_TOTAL_COUNT, data.count);
        return resolve(data);
      } catch (error) {
        return reject(error.response.data);
      }
    });
  },
  async [GET_COURSE]({ commit, state }, { slug, lesson: lessonSlug }) {
    return new Promise(async (resolve, reject) => {
      try {
        const course = state.data.find(
          courseFromState => courseFromState.slug === slug
        );

        if (course) {
          return resolve(course);
        }
        const { data } = await courses.getCourse(slug);

        if (lessonSlug) {
          const currentLesson = data.lessons.find(
            lesson => lesson.slug === lessonSlug
          );

          if (!currentLesson) {
            return reject();
          }
        }

        commit(ADD_COURSE, data);
        return resolve(data);
      } catch (error) {
        return reject(error.response.data);
      }
    });
  },
  async [COMPLETE_LESSON]({ commit, rootState, state }, lesson) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await courses.completeLesson(
          lesson,
          rootState.authUserData.jwt
        );
        commit(TOGGLE_COMPLETED_LESSON, data);
        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  },
  async [CREATE_SUBMISSION](
    { commit, rootState, state },
    { lesson, url, description }
  ) {
    return new Promise(async (resolve, reject) => {
      try {
        const course = state.data.find(course => course.id === lesson.course);

        const enrollment = course.enrollments.find(enrollment => {
          if (enrollment.course.id) {
            return (
              enrollment.course.id === course.id &&
              enrollment.user.id === rootState.authUserData.user._id
            );
          } else {
            return (
              enrollment.course === course.id &&
              enrollment.user === rootState.authUserData.user._id
            );
          }
        });

        const { data } = await courses.createSubmission(
          {
            lesson,
            url,
            description,
            enrollment
          },
          rootState.authUserData.jwt
        );

        commit(CREATE_SUBMISSION, data);

        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  },
  async [ADD_MENTOR_APPLICATION]({ commit, rootState }, course) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await courses.createMentorshipApplication(
          course,
          rootState.authUserData.jwt
        );
        commit(ADD_MENTOR_APPLICATION, data);

        return resolve(data);
      } catch (error) {
        return reject(error);
      }
    });
  },
  async [GET_ENROLLED_AND_MENTORED_COURSES]({ commit, rootState }, course) {
    return new Promise(async (resolve, reject) => {
      const { data } = await courses.getEnrolledAndMentoredCourses(
        rootState.authUserData.jwt
      );

      commit(ADD_ENROLLED_COURSES, data.enrollments);
      commit(ADD_MENTORED_COURSES, data.mentorshipEnrollments);
    });
  },
  async [ADD_SUBMISSION_COMMENT](
    { commit, rootState },
    { enrollment, submission, comment, approved }
  ) {
    return new Promise(async (resolve, reject) => {
      const { data } = await courses.addSubmissionComment(
        { submission: submission.id, comment, approved },
        rootState.authUserData.jwt
      );

      commit(ADD_SUBMISSION_COMMENT, { comment: data, enrollment });
      return resolve(data);
    });
  },
  async [GET_SUBMISSION_COMMENTS]({ rootState }, submission) {
    return new Promise(async (resolve, reject) => {
      const { data } = await courses.getSubmissionComments(
        submission.id,
        rootState.authUserData.jwt
      );

      return resolve(data);
    });
  }
};

export const getters = {
  [GET_COURSE](state) {
    return slug => state.data.find(course => course.slug === slug);
  },
  [GET_LESSON](state) {
    return ({ courseSlug, lessonSlug }) => {
      const course = state.data.find(course => course.slug === courseSlug);
      let currentLesson = null;

      if (course) {
        currentLesson = course.lessons.find(
          lesson => lesson.slug === lessonSlug
        );
      }

      return currentLesson;
    };
  }
};
