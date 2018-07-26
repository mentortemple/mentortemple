<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-10 col-md-10 offset-lg-1 offset-md-1 col-xs-12">
        <div class="article-content" v-if="article">
          <h1 class="mb-5 mt-3 text-center primary">{{ article.title }}</h1>
          <div v-html="$md.render(article.content)"></div>
        </div>
        <div class="comments-container mt-5">
            <div class="card">
              <vue-disqus shortname="bahdcasts" identifier="article-slug" url="https://www.bahdcasts.com/articles/1"></vue-disqus>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { GET_ARTICLE } from "@/store/articles";

export default {
  components: {},
  mounted() {
    this.getArticle();
  },
  methods: {
    getArticle() {
      this.$store
        .dispatch(`articles/${GET_ARTICLE}`, this.$route.params.slug)
        .catch(() => {
          this.$router.push("/blog");
        });
    }
  },
  computed: {
    article() {
      return this.$store.getters[`articles/${GET_ARTICLE}`](
        this.$route.params.slug
      );
    }
  }
};
</script>
