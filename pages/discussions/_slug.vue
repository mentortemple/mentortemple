<template>
    <div class="gradient">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div class="card course-card my-5" v-if="discussion">
            <div class="card-heading">
              <div class="card-title">
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
              <hr />
              <div class="course-description px-3">
                {{ discussion.content }}
              </div>
              <div class="course-tags">
                <!-- <span :style="{ backgroundColor: tag.color, color: '#fff' }" class="badge mx-1" v-for="tag in article.tags" :key="tag.id">{{ tag.name }}</span> -->
              </div>
            </div>
            <div class="card-body">
              <comment-box :discussion="discussion.id" />
              <div class="comments-list mt-5">
                <div class="media comment p-3 mt-3" :key="reply.id" v-for="reply in discussion.discussion_replies">
                  <vue-gravatar class="mr-3" :email="reply.user.email" />
                  <div class="media-body">
                    <h6 class="mt-2 font-weight-bold text-capitalize">{{ reply.user.username }}</h6>
                    <div v-html="$md.render(reply.content)"></div>
                    <comment-box :id="reply.id" :discussion="discussion.id" nested="true" />

                    <div class="media p-3 comment mt-3" :key="nestedReply.id" v-for="nestedReply in reply.replies">
                      <a class="pr-3" href="#">
                        <vue-gravatar class="mr-3" :email="nestedReply.user.email" />
                      </a>
                      <div class="media-body">
                        <h6 class="mt-2 font-weight-bold text-capitalize">{{ nestedReply.user.username }}</h6>
                        <div v-html="$md.render(nestedReply.content)"></div>
                      </div>
                    </div>
                  </div>
                </div>
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
import CommentBox from "@/components/CommentBox";
import { ADD_DISCUSSION } from "@/store/discussions";
import DiscussionCard from "@/components/DiscussionCard";

export default {
  components: {
    CommentBox,
    DiscussionCard
  },
  data() {
    return {
      rows: 3
    };
  },
  async fetch({ store, params }) {
    await store.dispatch(`discussions/${ADD_DISCUSSION}`, params.slug);
  },
  computed: {
    discussion() {
      return this.$store.getters[`discussions/${ADD_DISCUSSION}`](
        this.$route.params.slug
      );
    }
  }
};
</script>
