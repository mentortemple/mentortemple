import articles from "@/api/articles";

export const state = () => ({
  data: []
});

// mutations
export const ADD_ARTICLE = "ADD_ARTICLE";
export const ADD_ARTICLES = "ADD_ARTICLES";

// actions
export const GET_ARTICLE = "GET_ARTICLE";
export const GET_ARTICLES = "GET_ARTICLES";

export const mutations = {
  [ADD_ARTICLE](state, article) {
    state.data = [...state.data, article];
  },
  [ADD_ARTICLES](state, articles) {
    state.data = [...state.data, ...articles];
  }
};

export const actions = {
  async [GET_ARTICLE]({ commit, state }, slug) {
    return new Promise(async (resolve, reject) => {
      try {
        const article = state.data.find(
          articleInState => articleInState.slug === slug
        );
        if (article) {
          return resolve(article);
        }
        const { data } = await articles.getArticle(slug);

        commit(ADD_ARTICLE, data);
        return resolve(data);
      } catch (error) {
        return reject(error.response.data);
      }
    });
  },
  async [GET_ARTICLES]({ commit, state }, slug) {
    return new Promise(async (resolve, reject) => {
      try {
        if (state.data.length > 0) {
          return resolve();
        }

        const { data } = await articles.getArticles();

        commit(ADD_ARTICLES, data);
        return resolve(data);
      } catch (error) {
        return reject(error.response.data);
      }
    });
  }
};

export const getters = {
  [GET_ARTICLE](state) {
    return slug => state.data.find(article => article.slug === slug);
  },
  [GET_ARTICLES](state) {
    return state.data;
  }
};
