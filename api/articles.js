import axios from "axios";

export default {
  /**
   * Find an article by slug
   * @param {string} slug
   */
  getArticle(slug) {
    return axios.get(`${process.env.apiUrl}/article/${slug}`);
  },

  /**
   * Get articles
   */
  getArticles() {
    return axios.get(`${process.env.apiUrl}/article`);
  }
};
