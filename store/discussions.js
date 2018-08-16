export const state = () => ({
  data: []
});

const formatReplies = replies => {
  const nested = replies.filter(reply => reply.parent);
  const parents = replies.filter(reply => !reply.parent);

  const updatedParents = parents.map(parent => {
    parent.replies = parent.replies.map(parentReply => {
      const replyFromNested = nested.find(
        nestedReply => nestedReply.id === parentReply.id
      );
      return replyFromNested;
    });

    return parent;
  });

  return updatedParents;
};

// mutations
export const ADD_DISCUSSION = "ADD_DISCUSSION";
export const ADD_DISCUSSIONS = "ADD_DISCUSSIONS";
export const ADD_DISCUSSION_REPLY = "ADD_DISCUSSION_REPLY";

// actions
export const GET_DISCUSSION = "GET_DISCUSSION";
export const GET_DISCUSSIONS = "GET_DISCUSSIONS";

export const mutations = {
  [ADD_DISCUSSION](state, discussion) {
    discussion.discussion_replies = formatReplies(
      discussion.discussion_replies
    );
    state.data = [...state.data, discussion];

    const foundDiscussion = state.data.find(
      discussionInState => discussionInState.id === discussion.id
    );

    if (!foundDiscussion) {
      state.data = [...state.data, discussion];
    }
  },
  [ADD_DISCUSSIONS](state, discussions) {
    const newDiscussions = [];
    discussions.forEach(discussion => {
      discussion.discussion_replies = formatReplies(
        discussion.discussion_replies
      );
      if (
        !state.data.find(
          discussionInStore => discussionInStore.id === discussion.id
        )
      ) {
        newDiscussions.push(discussion);
      }
    });

    state.data = [...state.data, ...newDiscussions];
  },
  [ADD_DISCUSSION_REPLY](state, { newReply, payload }) {
    state.data = state.data.map(discussion => {
      if (discussion.id === payload.discussion) {
        if (payload.parent) {
          return {
            ...discussion,
            discussion_replies: discussion.discussion_replies.map(reply => {
              if (reply.id === payload.parent) {
                return {
                  ...reply,
                  replies: [...reply.replies, newReply]
                };
              }

              return reply;
            })
          };
        } else {
          return {
            ...discussion,
            discussion_replies: [...discussion.discussion_replies, newReply]
          };
        }
      }

      return discussion;
    });
  }
};

export const actions = {
  async [ADD_DISCUSSION]({ commit, state }, slug) {
    return new Promise(async (resolve, reject) => {
      try {
        const discussion = state.data.find(
          discussionInState => discussionInState.slug === slug
        );
        if (discussion) {
          return resolve(discussion);
        }
        const { data } = await this.$axios.get(`/discussion/${slug}`);
        commit(ADD_DISCUSSION, data);
        return resolve(data);
      } catch (error) {
        return reject(error.response.data);
      }
    });
  },
  async [ADD_DISCUSSIONS]({ commit, state }) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.$axios.get("/discussion");

        commit(ADD_DISCUSSIONS, data);
        return resolve(data);
      } catch (error) {
        return reject(error.response.data);
      }
    });
  },
  async [ADD_DISCUSSION_REPLY]({ commit, state }, payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { data: newReply } = await this.$axios.post("/reply", payload);

        commit(ADD_DISCUSSION_REPLY, { newReply, payload });

        return resolve(newReply);
      } catch (error) {
        return reject(error);
      }
    });
  }
};

export const getters = {
  [ADD_DISCUSSION](state) {
    return slug => state.data.find(article => article.slug === slug);
  },
  [ADD_DISCUSSIONS](state) {
    return state.data;
  }
};
