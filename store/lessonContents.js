import lessonContents from "@/api/lessonContents";

export default () => ({
  data: {}
});

export const GET_LESSON_CONTENT = "GET_LESSON_CONTENT";

export const actions = {
  [GET_LESSON_CONTENT](lesson) {
    return new Promise(async (resolve, reject) => {
      const { data: lessonContent } = await lessonContents.getLessonContent(
        lesson
      );

      commit(GET_LESSON_CONTENT, { lessonContent, lesson });
    });
  }
};

export const mutations = {
  [GET_LESSON_CONTENT]({ lessonContent, lesson }) {
    state.data[lesson.id] = lessonContent;
  }
};
