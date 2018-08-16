<template>
  <div class="card course-card my-5" v-if="discussion">
    <div class="card-heading">
      <div class="card-title">
        <div class="row">
          <div class="media discussion">
            <vue-gravatar class="mr-3" :email="discussion.user.email" />
            <div class="media-body">
              <nuxt-link :to="`/discussions/${discussion.slug}`">
                <h5 class="mt-0 font-weight-bold">{{ discussion.title }}</h5>
              </nuxt-link>
              <span class="text-capitalize">{{ discussion.user.username }}</span>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="course-description">
        {{ discussion.content }}
      </div>
      <div class="course-tags">
        <!-- <span :style="{ backgroundColor: tag.color, color: '#fff' }" class="badge mx-1" v-for="tag in article.tags" :key="tag.id">{{ tag.name }}</span> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["discussion"]
};
</script>
