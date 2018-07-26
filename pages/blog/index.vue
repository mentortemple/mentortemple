<template>
  <div class="gradient">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-md-10 col-xs-12 offset-lg-1 offset-md-1">
          <h1 class="mb-5 mt-3 text-center primary">Blog</h1>
          <blog-card :article="article" :key="article.id" v-for="article in articles"></blog-card>
          <div class="text-center">
            <button class="btn hero-button">Load More</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { GET_ARTICLES } from "@/store/articles";
import BlogArticleCard from "@/components/BlogArticleCard";

export default {
  components: {
    "blog-card": BlogArticleCard
  },
  mounted() {
    this.$store.dispatch(`articles/${GET_ARTICLES}`);
  },
  computed: {
    articles() {
      return this.$store.getters[`articles/${GET_ARTICLES}`];
    }
  }
};
</script>
