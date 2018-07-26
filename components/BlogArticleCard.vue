<template>
  <div class="card course-card my-5">
    <div class="card-heading">
      <div class="card-title">
        <div class="row">
          <div class="col-md-8">
            <p class="course-title">
              <span class="h5 font-weight-bold">{{ article.title }}</span>
              <span class="text-muted course-subtitle d-block">
                4 min read
              </span>
            </p>
          </div>
          <div class="col-md-4">
            <nuxt-link :to="getSingleArticleLink(article.slug)">
              <button class="btn btn-sm float-right btn-secondary course-link">
                Read More
              </button>
            </nuxt-link>
          </div>
        </div>
      </div>
      <hr />
      <div class="course-description">
        {{ article.description }}
      </div>
      <div class="course-tags">
        <span :style="{ backgroundColor: tag.color, color: '#fff' }" class="badge mx-1" v-for="tag in article.tags" :key="tag.id">{{ tag.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["article"],
  methods: {
    getSingleArticleLink(slug) {
      return `/blog/${slug}`;
    }
  }
};
</script>
