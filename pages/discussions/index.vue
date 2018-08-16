<template>
    <div class="gradient">
    <div class="container">
      <div class="row">
        <div class="col-lg-10 col-md-10 col-xs-12 offset-lg-1 offset-md-1">
            <div class="card course-card my-5" :key="discussion.id" v-for="discussion in discussions">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { ADD_DISCUSSIONS } from "@/store/discussions";
export default {
  async fetch({ store }) {
    await store.dispatch(`discussions/${ADD_DISCUSSIONS}`);
  },
  computed: {
    discussions() {
      return this.$store.getters[`discussions/${ADD_DISCUSSIONS}`];
    }
  }
};
</script>
